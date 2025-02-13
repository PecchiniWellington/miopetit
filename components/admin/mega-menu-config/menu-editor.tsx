"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomSelect from "../../shared/selects/custom-select";

const ItemType = {
  CATEGORY: "CATEGORY",
  MENU_ITEM: "MENU_ITEM",
};

interface MenuItem {
  name: string;
  slug: string;
}

interface Category {
  title: string;
  items: MenuItem[];
  index?: number;
}

export default function MenuEditor() {
  const [mainTitle, setMainTitle] = useState("Cani");
  const [menuImage, setMenuImage] = useState("http://cane.jpg");
  const [menu, setMenu] = useState<Category[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedMenu = localStorage.getItem("menuConfig");
    if (storedMenu) {
      const parsedMenu = JSON.parse(storedMenu);
      setMainTitle(parsedMenu.mainTitle || "Cani");
      setMenuImage(parsedMenu.img || "http://cane.jpg");
      setMenu(parsedMenu.menu || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "menuConfig",
      JSON.stringify({ mainTitle, img: menuImage, menu })
    );
  }, [mainTitle, menuImage, menu]);

  // Funzione per caricare un file JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.mainTitle && json.img && json.menu) {
          setMainTitle(json.mainTitle);
          setMenuImage(json.img);
          setMenu(json.menu);
        } else {
          alert("Formato JSON non valido!");
        }
      } catch {
        alert("Errore nel caricamento del file JSON!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto max-w-4xl p-6">
        {/* Bottone per l'upload del JSON */}
        <div className="mb-4">
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mb-4 rounded bg-green-500 px-4 py-2 text-white"
          >
            Carica JSON 📂
          </button>
        </div>
        {/* Input per il Titolo e l'Immagine del menu */}
        <div className="mb-4">
          <label className="block font-semibold">Titolo del Menu:</label>
          <input
            type="text"
            className="w-full rounded bg-[#1F2937] p-2"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Immagine del Menu:</label>
          <CustomSelect onChange={(value) => setMenuImage(value)} />
        </div>

        <button
          onClick={() =>
            setMenu([...menu, { title: "Nuova Categoria", items: [] }])
          }
          className="mb-4 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Aggiungi Categoria
        </button>

        {menu.length > 0 && (
          <div className="rounded bg-[#1F2937] p-4">
            {menu.map((category, index) => (
              <CategoryItem
                key={index}
                index={index}
                category={category}
                setMenu={setMenu}
              />
            ))}
          </div>
        )}

        <h2 className="mt-6 text-xl font-semibold">Anteprima JSON</h2>
        <pre className="rounded bg-[#1F2937] p-4 text-sm text-white">
          {JSON.stringify({ mainTitle, img: menuImage, menu }, null, 2)}
        </pre>
      </div>
    </DndProvider>
  );
}

const CategoryItem = ({
  category,
  index,
  setMenu,
}: {
  category: Category;
  index: number;
  setMenu: (menu: Category[] | ((prevMenu: Category[]) => Category[])) => void;
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType.CATEGORY,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<Category>({
    accept: ItemType.CATEGORY,
    hover: (draggedItem: { index?: number }) => {
      setMenu((prevMenu) => {
        const updatedMenu = [...prevMenu];
        const [movedItem] = updatedMenu.splice(draggedItem.index!, 1);
        updatedMenu.splice(index, 0, movedItem);
        draggedItem.index = index;
        return updatedMenu;
      });
    },
  });

  return (
    <div
      ref={(node) => {
        dragRef(dropRef(node));
      }}
      className={`mb-2 cursor-move rounded bg-gray-500 p-3 shadow ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex items-center justify-between">
        <input
          className="mb-2 w-full border bg-[#1F2937] p-2"
          value={category.title}
          onChange={(e) =>
            setMenu((prevMenu: Category[]) => {
              const updatedMenu = [...prevMenu];
              updatedMenu[index].title = e.target.value;
              return updatedMenu;
            })
          }
        />
        <button
          onClick={() =>
            setMenu((prevMenu: Category[]) =>
              prevMenu?.filter((_, i) => i !== index)
            )
          }
          className="ml-2 rounded bg-red-500 px-2 py-1 text-white"
        >
          X
        </button>
      </div>

      <button
        onClick={() =>
          setMenu((prevMenu: Category[]) => {
            const updatedMenu = [...prevMenu];
            updatedMenu[index].items.push({
              name: "Nuova Voce",
              slug: "nuova-voce",
            });
            return updatedMenu;
          })
        }
        className="mb-2 rounded bg-green-500 px-3 py-1 text-white"
      >
        Aggiungi Voce di Menu
      </button>

      <div className="rounded bg-[#1F2937] p-2">
        {category.items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="mb-1 flex gap-2 rounded bg-gray-400 p-2 shadow"
          >
            <input
              className="grow border p-1 text-slate-700"
              value={item.name}
              onChange={(e) =>
                setMenu((prevMenu: Category[]) => {
                  const updatedMenu = [...prevMenu];
                  updatedMenu[index].items[itemIndex].name = e.target.value;
                  return updatedMenu;
                })
              }
            />
            <input
              className="w-32 border p-1 text-slate-700"
              value={item.slug}
              onChange={(e) =>
                setMenu((prevMenu: Category[]) => {
                  const updatedMenu = [...prevMenu];
                  updatedMenu[index].items[itemIndex].slug = e.target.value;
                  return updatedMenu;
                })
              }
            />
            <button
              onClick={() =>
                setMenu((prevMenu: Category[]) => {
                  const updatedMenu = [...prevMenu];
                  updatedMenu[index].items = updatedMenu[index].items?.filter(
                    (_, i) => i !== itemIndex
                  );
                  return updatedMenu;
                })
              }
              className="ml-2 text-red-700"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
