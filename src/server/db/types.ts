import type { InferSelectModel } from "drizzle-orm";
import type { userDevices, userIps, users } from "./schema";

export type User = InferSelectModel<typeof users>;

export type Ip = InferSelectModel<typeof userIps>;

export type UserDevice = InferSelectModel<typeof userDevices>;
