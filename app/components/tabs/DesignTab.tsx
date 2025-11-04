const THEMES = [
    { name: "Default", value: "default" },
    { name: "Dark Mode", value: "dark" },
    { name: "Minimal", value: "minimal" },
    { name: "Vibrant", value: "vibrant" },
  ];
  
  interface TabProps {
    data: any;
    setData: (data: any) => void;
  }
  
  export default function DesignTab({ data, setData }: TabProps) {
    return (
      <div className="space-y-6 text-black">
        <div>
          <label className="block text-sm font-medium text-slate-700">Choose Theme</label>
          <div className="mt-3 flex flex-wrap gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.value}
                type="button"
                onClick={() => setData({ ...data, theme: theme.value })}
                className={`px-4 py-2 rounded-lg border ${
                  data.theme === theme.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-slate-700">Font Choice</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-blue-400"
            value={data.font || "sans-serif"}
            onChange={(e) => setData({ ...data, font: e.target.value })}
          >
            <option value="sans-serif">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-slate-700">Accent Color</label>
          <input
            type="color"
            className="mt-2 h-10 w-20 rounded border border-slate-300 cursor-pointer"
            value={data.accentColor || "#3B82F6"}
            onChange={(e) => setData({ ...data, accentColor: e.target.value })}
          />
        </div>
      </div>
    );
  }
  