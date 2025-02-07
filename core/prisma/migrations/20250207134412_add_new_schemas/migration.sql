-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productBrandId" UUID;

-- CreateTable
CREATE TABLE "AnimalAge" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stage" TEXT NOT NULL,

    CONSTRAINT "AnimalAge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Format" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "size" TEXT NOT NULL,

    CONSTRAINT "Format_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "ProductPatology" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductPatology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductProtein" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductProtein_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimalAge" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_AnimalAge_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductFormat" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ProductFormat_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductBrand" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ProductBrand_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductFeatures" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ProductFeatures_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductProtein" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ProductProtein_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductPatology" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ProductPatology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnimalAge_stage_key" ON "AnimalAge"("stage");

-- CreateIndex
CREATE UNIQUE INDEX "Format_size_key" ON "Format"("size");

-- CreateIndex
CREATE UNIQUE INDEX "ProductBrand_name_key" ON "ProductBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFeatures_name_key" ON "ProductFeatures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPatology_name_key" ON "ProductPatology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductProtein_name_key" ON "ProductProtein"("name");

-- CreateIndex
CREATE INDEX "_AnimalAge_B_index" ON "_AnimalAge"("B");

-- CreateIndex
CREATE INDEX "_ProductFormat_B_index" ON "_ProductFormat"("B");

-- CreateIndex
CREATE INDEX "_ProductBrand_B_index" ON "_ProductBrand"("B");

-- CreateIndex
CREATE INDEX "_ProductFeatures_B_index" ON "_ProductFeatures"("B");

-- CreateIndex
CREATE INDEX "_ProductProtein_B_index" ON "_ProductProtein"("B");

-- CreateIndex
CREATE INDEX "_ProductPatology_B_index" ON "_ProductPatology"("B");

-- AddForeignKey
ALTER TABLE "_AnimalAge" ADD CONSTRAINT "_AnimalAge_A_fkey" FOREIGN KEY ("A") REFERENCES "AnimalAge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalAge" ADD CONSTRAINT "_AnimalAge_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductFormat" ADD CONSTRAINT "_ProductFormat_A_fkey" FOREIGN KEY ("A") REFERENCES "Format"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductFormat" ADD CONSTRAINT "_ProductFormat_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBrand" ADD CONSTRAINT "_ProductBrand_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBrand" ADD CONSTRAINT "_ProductBrand_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductFeatures" ADD CONSTRAINT "_ProductFeatures_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductFeatures" ADD CONSTRAINT "_ProductFeatures_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductFeatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductProtein" ADD CONSTRAINT "_ProductProtein_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductProtein" ADD CONSTRAINT "_ProductProtein_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductProtein"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPatology" ADD CONSTRAINT "_ProductPatology_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPatology" ADD CONSTRAINT "_ProductPatology_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductPatology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
