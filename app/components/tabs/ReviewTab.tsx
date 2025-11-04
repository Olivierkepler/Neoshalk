interface TabProps {
    data: any;
    onSubmit: () => void;
  }
  
  export default function ReviewTab({ data, onSubmit }: TabProps) {
    return (
      <div className="space-y-6 text-black">
        <h3 className="text-lg font-semibold text-slate-800">Review Your Inputs</h3>
  
        <div className="space-y-3">
          <p>
            <strong>Title:</strong> {data.title || "—"}
          </p>
          <p>
            <strong>Subtitle:</strong> {data.subtitle || "—"}
          </p>
          <p>
            <strong>Description:</strong> {data.description || "—"}
          </p>
          <p>
            <strong>Points:</strong>{" "}
            {data.points?.length ? (
              <ul className="list-disc list-inside">
                {data.points.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            ) : (
              "—"
            )}
          </p>
          <p>
            <strong>Theme:</strong> {data.theme || "default"}
          </p>
          <p>
            <strong>Accent Color:</strong>{" "}
            <span
              className="inline-block w-5 h-5 rounded-full border"
              style={{ backgroundColor: data.accentColor || "#3B82F6" }}
            />
          </p>
          {data.images?.length > 0 && (
            <div>
              <strong>Images:</strong>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                {data.images.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-24 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
  
        <button
          onClick={onSubmit}
          className="w-full mt-6 rounded-lg bg-green-600 text-white py-2 font-semibold hover:bg-green-700 transition"
        >
          Generate Slides
        </button>
      </div>
    );
  }
  