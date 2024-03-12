DROP TABLE hedgehog;
CREATE TABLE hedgehog (
    "id" serial NOT NULL,
    "name" VARCHAR(30),
    "age" INTEGER,
    "gender" VARCHAR(30),
    "lat" FLOAT,
    "lon" FLOAT
);