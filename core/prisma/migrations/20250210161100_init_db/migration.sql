-- CreateEnum
CREATE TYPE "AnimalAge" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');

-- CreateTable
CREATE TABLE "Account" (
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","provider_account_id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "sessionCartId" TEXT NOT NULL,
    "items" JSON[] DEFAULT ARRAY[]::JSON[],
    "itemsPrice" DECIMAL(12,2) NOT NULL,
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "shippingPrice" DECIMAL(12,2) NOT NULL,
    "taxPrice" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "shippingAddress" JSON NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentResult" JSON,
    "itemsPrice" DECIMAL(12,2) NOT NULL,
    "shippingPrice" DECIMAL(12,2) NOT NULL,
    "taxPrice" DECIMAL(12,2) NOT NULL,
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "isDelivered" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(6),
    "deliveredAt" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "name" TEXT,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderItems_orderId_productId_pk" PRIMARY KEY ("orderId","productId")
);

-- CreateTable
CREATE TABLE "ProductBrand" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFeatures" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFormat" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "size" TEXT NOT NULL,

    CONSTRAINT "ProductFormat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPathology" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductPathology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductProtein" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductProtein_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "images" TEXT[],
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "numReviews" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN DEFAULT false,
    "banner" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animalAge" "AnimalAge",
    "productPatologyId" UUID,
    "productProteinId" UUID,
    "categoryId" UUID,
    "formatId" UUID,
    "productFeaturesId" UUID,
    "productBrandId" UUID,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "isVerifiedPurchase" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "session_token" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'NO_NAME',
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "address" JSON,
    "paymentMethod" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductBrand_name_key" ON "ProductBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFeatures_name_key" ON "ProductFeatures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFormat_size_key" ON "ProductFormat"("size");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPathology_name_key" ON "ProductPathology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductProtein_name_key" ON "ProductProtein"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_idx" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "ProductFormat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productFeaturesId_fkey" FOREIGN KEY ("productFeaturesId") REFERENCES "ProductFeatures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productProteinId_fkey" FOREIGN KEY ("productProteinId") REFERENCES "ProductProtein"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productBrandId_fkey" FOREIGN KEY ("productBrandId") REFERENCES "ProductBrand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productPatologyId_fkey" FOREIGN KEY ("productPatologyId") REFERENCES "ProductPathology"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
