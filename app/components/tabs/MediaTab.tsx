import { useRef } from "react";

interface TabProps {
  data: any;
  setData: (data: any) => void;
}

export default function MediaTab({ data, setData }: TabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setData({ ...data, images: [...(data.images || []), ...urls] });
  };

  const removeImage = (index: number) => {
    const updated = data.images.filter((_: any, i: number) => i !== index);
    setData({ ...data, images: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700">Upload Images</label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="mt-2 block w-full text-sm text-slate-600"
          onChange={handleFileUpload}
        />
      </div>

      {data.images && data.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {data.images.map((src: string, index: number) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
