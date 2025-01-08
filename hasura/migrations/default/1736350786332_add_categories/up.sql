CREATE TABLE "public"."Category" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);


-- add category to post
ALTER TABLE "public"."Post"
ADD COLUMN "categoryId" INTEGER REFERENCES "public"."Category"("id");
