CREATE TABLE IF NOT EXISTS "users" (
	"user_id" varchar(24) PRIMARY KEY DEFAULT nanoid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "USER_NAME_UNIQUE" UNIQUE("first_name","middle_name","last_name")
);
