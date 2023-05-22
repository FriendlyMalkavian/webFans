CREATE TABLE "collections"(
    "id" bigserial NOT NULL,
    "publication_id" BIGINT NOT NULL,
    "collector_id" BIGINT NOT NULL,
    "collection_title" TEXT NOT NULL
);
CREATE INDEX "collections_collector_id_collection_title_index" ON
    "collections"("collector_id", "collection_title");
ALTER TABLE
    "collections" ADD PRIMARY KEY("id");
CREATE TABLE "block_list"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NULL,
    "blocked_post_id" BIGINT NULL,
    "blocked_user_id" BIGINT NULL,
    "blocked_comment_id" BIGINT NULL,
    "timer" BIGINT NULL
);
CREATE INDEX "block_list_user_id_index" ON
    "block_list"("user_id");
ALTER TABLE
    "block_list" ADD PRIMARY KEY("id");
CREATE TABLE "messages"(
    "id" bigserial NOT NULL,
    "message" TEXT NOT NULL,
    "sender_id" BIGINT NOT NULL,
    "recipient_id" BIGINT NULL,
    "date" BIGINT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT '0'
);
CREATE INDEX "messages_sender_id_index" ON
    "messages"("sender_id");
CREATE INDEX "messages_recipient_id_index" ON
    "messages"("recipient_id");
ALTER TABLE
    "messages" ADD PRIMARY KEY("id");
CREATE TABLE "notifications"(
    "id" bigserial NOT NULL,
    "publication_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "date" BIGINT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT '0'
);
CREATE INDEX "notifications_user_id_index" ON
    "notifications"("user_id");
ALTER TABLE
    "notifications" ADD PRIMARY KEY("id");
CREATE TABLE "likes"(
    "id" bigserial NOT NULL,
    "publication_id" BIGINT NULL,
    "liker_id" BIGINT NOT NULL,
    "comment_id" BIGINT NULL
);
CREATE INDEX "likes_liker_id_index" ON
    "likes"("liker_id");
CREATE INDEX "likes_publication_id_index" ON
    "likes"("publication_id");
ALTER TABLE
    "likes" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" bigserial NOT NULL,
    "guid" UUID NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'default_avatar',
    "cover" TEXT NOT NULL DEFAULT 'default_cover',
    "city" TEXT NULL,
    "country" TEXT NULL,
    "language" TEXT NULL,
    "description" TEXT NULL
);
CREATE INDEX "users_name_index" ON
    "users"("name");
CREATE INDEX "users_guid_index" ON
    "users"("guid");
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_guid_unique" UNIQUE("guid");
ALTER TABLE
    "users" ADD CONSTRAINT "users_login_unique" UNIQUE("login");
CREATE TABLE "followers"(
    "id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "follower_id" BIGINT NOT NULL,
    "date" BIGINT NOT NULL
);
CREATE INDEX "followers_user_id_index" ON
    "followers"("user_id");
CREATE INDEX "followers_follower_id_index" ON
    "followers"("follower_id");
ALTER TABLE
    "followers" ADD PRIMARY KEY("id");
CREATE TABLE "comments"(
    "id" bigserial NOT NULL,
    "publication_id" BIGINT NOT NULL,
    "commentator_id" BIGINT NOT NULL,
    "comment" TEXT NOT NULL,
    "date" BIGINT NOT NULL
);
CREATE INDEX "comments_publication_id_index" ON
    "comments"("publication_id");
ALTER TABLE
    "comments" ADD PRIMARY KEY("id");
CREATE TABLE "bookmarks"(
    "id" bigserial NOT NULL,
    "publication_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "date" BIGINT NOT NULL
);
CREATE INDEX "bookmarks_user_id_index" ON
    "bookmarks"("user_id");
CREATE INDEX "bookmarks_publication_id_index" ON
    "bookmarks"("publication_id");
ALTER TABLE
    "bookmarks" ADD PRIMARY KEY("id");
CREATE TABLE "publications"(
    "id" bigserial NOT NULL,
    "publisher_id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NULL,
    "date" BIGINT NOT NULL,
    "comments_allow" BOOLEAN NULL DEFAULT '1'
);
CREATE INDEX "publications_publisher_id_index" ON
    "publications"("publisher_id");
CREATE INDEX "publications_title_index" ON
    "publications"("title");
ALTER TABLE
    "publications" ADD PRIMARY KEY("id");
CREATE TABLE "replies"(
    "id" bigserial NOT NULL,
    "responder_id" BIGINT NOT NULL,
    "comment_id" BIGINT NOT NULL,
    "reply" TEXT NOT NULL,
    "date" BIGINT NOT NULL
);
CREATE INDEX "replies_comment_id_index" ON
    "replies"("comment_id");
ALTER TABLE
    "replies" ADD PRIMARY KEY("id");
ALTER TABLE
    "likes" ADD CONSTRAINT "likes_publication_id_foreign" FOREIGN KEY("publication_id") REFERENCES "publications"("id");
ALTER TABLE
    "block_list" ADD CONSTRAINT "block_list_blocked_post_id_foreign" FOREIGN KEY("blocked_post_id") REFERENCES "publications"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_sender_id_foreign" FOREIGN KEY("sender_id") REFERENCES "users"("id");
ALTER TABLE
    "publications" ADD CONSTRAINT "publications_publisher_id_foreign" FOREIGN KEY("publisher_id") REFERENCES "users"("id");
ALTER TABLE
    "collections" ADD CONSTRAINT "collections_publication_id_foreign" FOREIGN KEY("publication_id") REFERENCES "publications"("id");
ALTER TABLE
    "block_list" ADD CONSTRAINT "block_list_blocked_comment_id_foreign" FOREIGN KEY("blocked_comment_id") REFERENCES "comments"("id");
ALTER TABLE
    "bookmarks" ADD CONSTRAINT "bookmarks_publication_id_foreign" FOREIGN KEY("publication_id") REFERENCES "publications"("id");
ALTER TABLE
    "followers" ADD CONSTRAINT "followers_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "likes" ADD CONSTRAINT "likes_comment_id_foreign" FOREIGN KEY("comment_id") REFERENCES "comments"("id");
ALTER TABLE
    "block_list" ADD CONSTRAINT "block_list_blocked_user_id_foreign" FOREIGN KEY("blocked_user_id") REFERENCES "users"("id");
ALTER TABLE
    "bookmarks" ADD CONSTRAINT "bookmarks_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "likes" ADD CONSTRAINT "likes_liker_id_foreign" FOREIGN KEY("liker_id") REFERENCES "users"("id");
ALTER TABLE
    "block_list" ADD CONSTRAINT "block_list_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "followers" ADD CONSTRAINT "followers_follower_id_foreign" FOREIGN KEY("follower_id") REFERENCES "users"("id");
ALTER TABLE
    "comments" ADD CONSTRAINT "comments_publication_id_foreign" FOREIGN KEY("publication_id") REFERENCES "publications"("id");
ALTER TABLE
    "notifications" ADD CONSTRAINT "notifications_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "collections" ADD CONSTRAINT "collections_collector_id_foreign" FOREIGN KEY("collector_id") REFERENCES "users"("id");
ALTER TABLE
    "comments" ADD CONSTRAINT "comments_commentator_id_foreign" FOREIGN KEY("commentator_id") REFERENCES "users"("id");
ALTER TABLE
    "notifications" ADD CONSTRAINT "notifications_publication_id_foreign" FOREIGN KEY("publication_id") REFERENCES "publications"("id");
ALTER TABLE
    "replies" ADD CONSTRAINT "replies_responder_id_foreign" FOREIGN KEY("responder_id") REFERENCES "users"("id");
ALTER TABLE
    "replies" ADD CONSTRAINT "replies_comment_id_foreign" FOREIGN KEY("comment_id") REFERENCES "comments"("id");