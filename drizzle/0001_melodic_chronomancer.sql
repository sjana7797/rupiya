DO $$ BEGIN
 CREATE TYPE "public"."UserType" AS ENUM('anonymous', 'guest', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "ips" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "devices" ADD COLUMN "user_agent" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_type" "UserType" DEFAULT 'anonymous';