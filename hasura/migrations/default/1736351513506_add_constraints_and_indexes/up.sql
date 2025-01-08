ALTER TABLE "public"."User"
ADD CONSTRAINT "age_check" CHECK (age >= 0 AND age <= 100);

CREATE INDEX "user_email_idx" ON "public"."User"("email");

CREATE INDEX "post_title_idx" ON "public"."Post"("title");