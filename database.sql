
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Create database "plantry"

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(50) NOT NULL UNIQUE,
	"password" varchar(50) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "favorite_recipes" (
	"id" SERIAL PRIMARY KEY,
	"label" VARCHAR(200),
	"image" TEXT,
	"url" TEXT,
	"source" VARCHAR(200),
	"calories" FLOAT(2),
	"yield" INT, 
	"user_id" INT REFERENCES "user"
	);
	
	
CREATE TABLE "ingredients" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT,
	"in_pantry" BOOLEAN DEFAULT FALSE,
	"recipe_id" INT REFERENCES "favorite_recipes"
	ON DELETE CASCADE
	);

	
CREATE TABLE "grocery_list" (
	"id" SERIAL PRIMARY KEY,
	"purchased" BOOLEAN DEFAULT FALSE,
	"name" VARCHAR(200) NOT NULL,
	"quantity" INT,
	"unit" varchar(100),
	"user_id" INT REFERENCES "user",
	"category_id" INT REFERENCES "grocery_category"
);

CREATE TABLE "grocery_category" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100)
	);


CREATE TABLE "pantry" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"item" VARCHAR(300) NOT NULL,
	"date_purchased" DATE DEFAULT CURRENT_TIMESTAMP,
	"staple" BOOLEAN DEFAULT FALSE,
	"quantity" DECIMAL (5,2),
	"unit" VARCHAR(100),
	"category_id" INT REFERENCES "grocery_category"
);
