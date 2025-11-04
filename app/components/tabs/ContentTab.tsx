interface TabProps {
    data: any;
    setData: (data: any) => void;
  }
  
  export default function ContentTab({ data, setData }: TabProps) {
    const handlePointsChange = (value: string) => {
      const points = value.split("\n").filter((p) => p.trim() !== "");
      setData({ ...data, points });
    };
  
    return (
      <div className="space-y-6 text-black">
        <div>
          <label className="block text-sm font-medium text-slate-700">Main Bullet Points</label>
          <textarea
            className="mt-2 h-40 w-full rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-blue-400"
            placeholder={`Problem\nApproach\nResults\nNext Steps`}
            value={data.points?.join("\n") || ""}
            onChange={(e) => handlePointsChange(e.target.value)}
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-slate-700">Additional Notes</label>
          <textarea
            className="mt-2 h-32 w-full rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-blue-400"
            placeholder="Add more detailed content or narration notes..."
            value={data.notes || ""}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
          />
        </div>
      </div>
    );
  }
  