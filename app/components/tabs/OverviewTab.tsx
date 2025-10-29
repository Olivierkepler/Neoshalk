interface TabProps {
    data: any;
    setData: (data: any) => void;
  }
  
  export default function OverviewTab({ data, setData }: TabProps) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input
            type="text"
            className="mt-2 w-full rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter your presentation title" 
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-slate-700">Subtitle</label>
          <input
            type="text"

className="mt-2 w-full rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-blue-400 text-black"
          
            placeholder="Add a subtitle (optional)"
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
          className="mt-2 w-full rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-blue-400 text-black"
          
            placeholder="Describe what your presentation is about..."
            value={data.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      </div>
    );
  }
  