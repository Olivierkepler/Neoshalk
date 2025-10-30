Project Hand-off: Milestone 2 (PDF-to-AI)

This document outlines the first major feature we've built for the NeoShark platform: the PDF-to-AI Note Generation pipeline.

Milestone Achieved

We have successfully built and tested the complete end-to-end data flow for a user to upload a PDF and receive organized, AI-generated notes.

The current implementation is fully functional:

A user clicks the "Upload PDF" button in the NoteEditor.

The PDF is sent to the server and parsed, extracting all raw text.

The raw text is sent to the OpenAI API (GPT-4o-mini).

The AI organizes the text into clean, study-ready markdown.

The final markdown is sent back to the client and (for testing) is printed in the browser's console.

How It Works: The Data Flow

This entire feature was built following our modular design principles. The logic is contained in separate, shareable files.

app/dashboard/projects/components/PdfUploadButton.tsx (Client)

This is the user-facing component.

It renders the "Upload PDF" button and the hidden file input.

It manages all loading/error states ("Parsing...", "Organizing...").

It "chains" the two API calls together.

app/dashboard/projects/api/parse-pdf/route.ts (Server)

Receives the File object.

Uses the pdf-parse library to extract raw text from the PDF buffer.

Sends the raw text back to the client.

app/dashboard/projects/api/organize-note/route.ts (Server)

Receives the raw text from the button.

Uses a "system prompt" to instruct the OpenAI API (gpt-4o-mini) to act as an academic assistant and organize the text using markdown.

Sends the final, organized markdown text back to the client.

PdfUploadButton.tsx (Client, again)

Receives the final markdown.

Current Step: console.logs the result for testing.

Next Step: Will pass this text to the NoteEditor to be displayed.

Key Files & Configuration

To make this work, we created/modified the following:

New Component: app/dashboard/projects/components/PdfUploadButton.tsx

New API Route 1: app/dashboard/projects/api/parse-pdf/route.ts

New API Route 2: app/dashboard/projects/api/organize-note/route.ts

Modified Page: app/dashboard/projects/components/NoteEditor.tsx (to add the button to the new action bar).

Modified Config: next.config.ts (to add serverExternalPackages: ['pdf-parse']).

New Dependency: pdf-parse (and @types/pdf-parse).

Our Development Rules (Reminder)

This feature is a perfect example of how we are building the project:

Modular: Every new piece of logic is in its own file (PdfUploadButton, parse-pdf route, organize-note route).

Shareable: We can give a partner the PdfUploadButton.tsx file and the two API folders, and they can easily add this feature to their version of the project.

Data-Driven: The PdfUploadButton is a "smart" component. It handles its own complex logic (parsing, AI) and will eventually just "emit" the final result to its parent (NoteEditor.tsx).

Next Step: Part 3

Our pipeline is confirmed to work. The final step is to display the text. We will implement Part 3 of our plan:

Add a new prop to PdfUploadButton.tsx called onTextOrganized.

In handleFileChange, replace console.log(organizedText) with props.onTextOrganized(organizedText).

In NoteEditor.tsx, pass this new prop to the button: <PdfUploadButton onTextOrganized={(text) => setContent(text)} />.
