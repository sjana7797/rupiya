// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userType = pgEnum("UserType", ["anonymous", "guest", "user"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: varchar("phone", { length: 256 }),
  ip: varchar("ip").notNull(),
  type: userType("user_type").default("anonymous"),
  createdAt: timestamp("created_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const userDevices = pgTable("devices", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  ip: varchar("ip").notNull(),
  userAgent: text("user_agent").notNull().default(""),
  detectedBrowser: text("detected_browser").notNull().default(""),
  detectedOs: text("detected_os").notNull().default(""),
  detectedDevice: text("detected_device").notNull().default(""),
  createdAt: timestamp("created_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const userIps = pgTable("ips", {
  ip: varchar("ip").notNull().primaryKey(),
  userId: uuid("userId").notNull(),
});

export const usersRelations = relations(users, ({ one }) => {
  return {
    ip: one(userIps, {
      fields: [users.ip],
      references: [userIps.ip],
    }),
  };
});

export const ipsRelations = relations(userIps, ({ many, one }) => {
  return {
    userDevices: many(userDevices),
    user: one(users),
  };
});

export const userDevicesRelations = relations(userDevices, ({ one }) => {
  return {
    userIp: one(userIps, {
      fields: [userDevices.ip],
      references: [userIps.ip],
    }),
  };
});
