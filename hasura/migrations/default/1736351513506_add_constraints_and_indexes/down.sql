DROP INDEX IF EXISTS "public"."post_title_idx";
DROP INDEX IF EXISTS "public"."user_email_idx";

ALTER TABLE "public"."User"
DROP CONSTRAINT "age_check";