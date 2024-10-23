import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { userDevices, userIps, users } from "~/server/db/schema";
import type { UserDevice } from "~/server/db/types";
import DeviceDetector from "device-detector-js";
import superjson from "superjson";

export const ipsRouter = createTRPCRouter({
  setIpsAndDevice: publicProcedure
    .input(
      z.object({
        deviceId: z.string().nullable(),
        ip: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db, headers } = ctx;
      const { deviceId, ip } = input;
      const userAgent = headers.get("user-agent") ?? "Unknown";
      let ips = await db.select().from(userIps).where(eq(userIps.ip, ip));

      let device: UserDevice | null = null;

      if (deviceId) {
        const devices = await db
          .select()
          .from(userDevices)
          .where(eq(userDevices.id, deviceId));

        if (devices.length > 0) {
          device = devices[0] ?? null;
        }
      }

      if (ips.length <= 0) {
        const user = await db
          .insert(users)
          .values({
            ip,
          })
          .returning();

        if (user.length <= 0 || !user[0]) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "user unable to create",
          });
        }

        const userId = user[0].id;
        ips = await db
          .insert(userIps)
          .values({
            ip,
            userId,
          })
          .returning();

        if (ips.length <= 0 || !ips[0]) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "failed to fetch user ip",
          });
        }

        if (!device) {
          // Parse the user agent string
          const deviceDetector = new DeviceDetector();
          const device = deviceDetector.parse(userAgent);
          const { json: clientSerializeJSON } = superjson.serialize(
            device.client,
          );
          const { json: osSerializeJSON } = superjson.serialize(device.os);
          const { json: deviceSerializeJSON } = superjson.serialize(
            device.device,
          );
          await db
            .insert(userDevices)
            .values({
              ip,
              userId,
              userAgent,
              detectedBrowser: JSON.stringify(clientSerializeJSON),
              detectedOs: JSON.stringify(osSerializeJSON),
              detectedDevice: JSON.stringify(deviceSerializeJSON),
            })
            .returning();
        }
      }

      return {
        userId: device?.id,
      };
    }),
});
