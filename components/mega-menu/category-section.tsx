import Link from "next/link";

interface ICategory {
  title: string;
  items: IMenuItem[];
}

interface IMenuItem {
  name: string;
  slug: string;
}

export const CategorySection = ({ menu }: { menu: ICategory[] }) => {
  return (
    <div className="col-span-3 grid grid-cols-3 gap-6">
      {menu.map((category, index) => (
        <div key={index}>
          <h3 className="mb-2 text-lg font-semibold text-black">
            {category.title}
          </h3>
          {category.items.length > 0 ? (
            <ul>
              {category.items.map((item, idx) => (
                <li
                  key={idx}
                  className="mb-1 cursor-pointer text-gray-600 hover:text-black"
                >
                  <Link href={`/category/${item.slug}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic text-gray-400">Nessun elemento</p>
          )}
        </div>
      ))}
    </div>
  );
};
