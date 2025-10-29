export type  Slide = {
    id: number; 
    title: string;
    content : string; 
    type: "title" | "content"
};



/**
 * Generates an array of Slide objects from the given input.
 * The first slide is a title slide, followed by content slides for each point.
 * 
 * @param input - An object containing a title and a string of points (separated by newlines)
 * @returns An array of Slide objects
 */
export function generateSlides(input: { title: string; points: string }): Slide[] { 
    // Split the points string into an array, trimming whitespace and removing empty lines
    const pointsArray = input.points
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

    // Create the slides array:
    // - The first slide is a title slide with the provided title (or "My Talk" as default)
    // - The rest are content slides, one for each point
    return [
        {
            id: 1,
            title: input.title || "My Talk",
            content: "Overview",
            type: "title"
        },
        ...pointsArray.map((p, i) => ({
            id: i + 2, // IDs start from 2 for content slides
            title: p,
            content: "",
            type: "content" as const,
        })),
    ];
}
