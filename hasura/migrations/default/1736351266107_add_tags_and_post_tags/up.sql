CREATE TABLE "public"."Tag"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

-- add junction table post_tags (trung gian giữa post và tag)
CREATE TABLE "public"."PostTag" (
    "postId" INTEGER REFERENCES "public"."Post"("id"),
    "tagId" INTEGER REFERENCES "public"."Tag"("id"),
    PRIMARY KEY ("postId", "tagId")
);