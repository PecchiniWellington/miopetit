-- CreateTable
CREATE TABLE "discount_record" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(6),
    "discounted_price" DOUBLE PRECISION NOT NULL,
    "original_price" DOUBLE PRECISION NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "discount_record_pkey" PRIMARY KEY ("id")
);
