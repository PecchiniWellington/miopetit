"use client";

import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface UploadImageProps {
  onChange?: (payload: { isFeatured?: boolean; images: string[] }) => void;
  isFeatured?: boolean;
  multiple?: boolean;
  images?: string[] | null;
}
const UploadImage: React.FC<UploadImageProps> = ({
  onChange,
  isFeatured,
  images,
  multiple = false,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>(
    (images ?? []).filter((img): img is string => typeof img === "string")
  );
  const [featured, setFeatured] = useState<boolean>(isFeatured || false);

  useEffect(() => {
    if (onChange) {
      onChange({
        ...(isFeatured ? { isFeatured: featured } : {}),
        images: previews,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featured, previews, isFeatured]);

  useEffect(() => {
    if (images && JSON.stringify(images) !== JSON.stringify(previews)) {
      setPreviews(images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => (multiple ? [...prev, ...objectUrls] : objectUrls));
  };

  const handleRemoveImage = (url: string) => {
    const filteredPreviews = previews.filter((p) => p !== url);
    setPreviews(filteredPreviews);
  };

  const renderUploader = () => (
    <div
      onClick={() => inputFileRef.current?.click()}
      className={`${multiple ? "flex flex-col items-center justify-center gap-4" : "flex h-48 items-center justify-center"} cursor-pointer rounded-md border border-dashed border-slate-600 bg-slate-800 px-8 py-10 text-center transition hover:border-slate-400 hover:bg-slate-700`}
    >
      <UploadCloud className="size-10 text-slate-300" />
      <p className="mb-2 text-sm text-slate-300">
        Drag & drop or click to upload image{multiple ? "s" : ""}
      </p>
      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        multiple={multiple}
      />
    </div>
  );

  if (!isFeatured) {
    return (
      <div className="flex flex-col gap-6">
        {previews.length > 0 && (
          <div
            className={
              multiple
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
                : "flex justify-center"
            }
          >
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden rounded-md border border-slate-600 shadow-lg"
              >
                <Image
                  src={preview}
                  alt={`Uploaded Image ${index + 1}`}
                  width={800}
                  height={300}
                  className={`h-52 w-full rounded-md ${multiple ? "object-cover" : "object-contain"} object-center`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(preview)}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1 hover:bg-black/80"
                >
                  <X className="size-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
        {renderUploader()}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <FormField
        name="isFeatured"
        render={() => (
          <FormItem className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="size-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-0 focus:ring-offset-0"
            />
            <FormLabel className="text-white">Featured Product</FormLabel>
          </FormItem>
        )}
      />
      {featured && (
        <>
          {previews.length > 0 && (
            <div
              className={
                multiple
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
                  : "flex justify-center"
              }
            >
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-full overflow-hidden rounded-md border border-slate-600 shadow-lg"
                >
                  <Image
                    src={preview}
                    alt={`Banner Image ${index + 1}`}
                    width={800}
                    height={300}
                    className={`h-52 w-full rounded-md ${multiple ? "object-cover" : "object-contain"} object-center`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(preview)}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 hover:bg-black/80"
                  >
                    <X className="size-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {renderUploader()}
        </>
      )}
    </div>
  );
};

export default UploadImage;
