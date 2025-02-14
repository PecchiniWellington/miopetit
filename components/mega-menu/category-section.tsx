import Link from "next/link";

interface ICategory {
  name: string;
  slug: string;
  children?: ICategory[];
}

export const CategorySection = ({
  categories,
  mainCategory,
}: {
  categories: ICategory[];
  mainCategory: string;
}) => {
  return (
    <div className="col-span-3 grid grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <div key={index}>
          <h3 className="mb-2 text-lg font-semibold text-black">
            {category.name}
          </h3>
          {category.children && category.children.length > 0 ? (
            <ul>
              {category.children.map((child, idx) => (
                <li
                  key={idx}
                  className="mb-1 cursor-pointer text-gray-600 hover:text-black"
                >
                  <Link href={`/${child.slug}`}>{child.name}</Link>
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
