import CarouselIndispensable from "@/components/carousels/carousel-indispensable";
import CarouselShared from "@/components/carousels/carousel-shared";
import CategoryType from "@/components/category/category-component";
import SmallProductCard from "@/components/shared/product/small-product-card";
import { getAllProducts, getLatestProducts } from "@/core/actions/products";
import { getProductCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";

const indispensableDog = [
  {
    image: "indispensabili-dog/cane-accessori.webp",
    label: "Accessori",
    href: "/dog/accessori",
  },
  {
    image: "indispensabili-dog/cane-antiparassitari.webp",
    label: "Antiparassitari",
    href: "/dog/antiparassitari",
  },
  {
    image: "indispensabili-dog/cane-cibo-secco.webp",
    label: "Cibo secco",
    href: "/dog/cibo-secco",
  },
  {
    image: "indispensabili-dog/cane-cibo-umido.webp",
    label: "Cibo umido",
    href: "/dog/cibo-umido",
  },
  {
    image: "indispensabili-dog/cane-cucce.webp",
    label: "Cucce",
    href: "/dog/cucce",
  },
  {
    image: "indispensabili-dog/cane-guinzaglieria.webp",
    label: "Guinzaglieria",
    href: "/dog/guinzaglieria",
  },
  {
    image: "indispensabili-dog/cane-igiene.webp",
    label: "Igiene",
    href: "/dog/igiene",
  },
  {
    image: "indispensabili-dog/cane-snack.webp",
    label: "Snack",
    href: "/dog/snack",
  },
  {
    image: "indispensabili-dog/cane-trasportini.webp",
    label: "Trasportini",
    href: "/dog/trasportini",
  },
];

const MainCategory = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort: string;
    page: string;
  }>;
  params: Promise<{ categories: string }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;
  const { categories } = await props.params;

  const products = await getAllProducts({
    query: q,
    page: Number(page),
    category,
    price,
    rating,
    sort,
  });

  const categoriesData = await getProductCategories();

  const p = await getLatestProducts({
    limit: 8,
  });
  const data = p.map((product) => ({
    ...product,
    image: "/images/royal-canin-4.jpg",
  }));

  if (categories === "dog")
    return (
      <div>
        <div className="mb-12 flex flex-col rounded-2xl bg-slate-100 p-6">
          <section className="mb-6">
            <CarouselIndispensable
              indispensables={indispensableDog}
              animalCategory={categories}
            />
          </section>
          <section className="mb-6">
            <CarouselShared title="Offerte del giorno">
              <SmallProductCard />
            </CarouselShared>
          </section>
          <section className="mb-6">
            <CarouselShared title="Scelti per te">
              <SmallProductCard />
            </CarouselShared>
          </section>
        </div>
        <section className="relative mb-6 flex w-full items-center gap-4 ">
          <CategoryType
            categories={categoriesData.map((cat) => ({
              id: cat.category.id,
              name: cat.category.name,
              slug: cat.category.slug,
              description: null,
            }))}
            q={q}
            products={products.data}
            price={price}
            rating={rating}
            sort={sort}
            page={page}
            category={category}
            slug={categories}
          />
        </section>
      </div>
    );
};

export default MainCategory;
