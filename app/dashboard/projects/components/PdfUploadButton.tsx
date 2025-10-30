"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, FileUp } from "lucide-react";

type UploadStatus = "idle" | "parsing" | "organizing" | "error";

// 1. Define the props interface for this component
interface PdfUploadButtonProps {
  onTextOrganized: (text: string) => void;
}

// 2. Accept the 'props' (which includes onTextOrganized)
export function PdfUploadButton({ onTextOrganized }: PdfUploadButtonProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleApiResponse = async (response: Response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "An unknown API error occurred.");
      }
      return data;
    } else {
      const errorText = await response.text();
      console.error("API Error: Expected JSON, got HTML:", errorText);
      throw new Error("Server error. Check the console for details.");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setStatus("parsing");
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // --- PART 1: PARSE THE PDF ---
      const parseResponse = await fetch("/dashboard/projects/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const parseData = await handleApiResponse(parseResponse);
      const rawText = parseData.text;

      // --- PART 2: ORGANIZE THE TEXT ---
      setStatus("organizing");
      const organizeResponse = await fetch("/dashboard/projects/api/organize-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });

      const organizeData = await handleApiResponse(organizeResponse);
      const organizedText = organizeData.text;

      // --- PART 3: EMIT THE RESULT ---
      // 3. Replaced console.log with the new prop
      if (organizedText) {
        onTextOrganized(organizedText);
      }
      
      setStatus("idle");

    } catch (err: any) {
      console.error("Upload process failed:", err);
      setError(err.message || "An unknown error occurred.");
      setStatus("error");
    } finally {
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleButtonClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const isLoading = status === "parsing" || status === "organizing";
  let buttonText = "Upload PDF";
  if (status === "parsing") buttonText = "Parsing...";
  if (status === "organizing") buttonText = "Organizing...";

  return (
    <div className="flex items-center">
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={isLoading}
      />

      <Button
        onClick={handleButtonClick}
        disabled={isLoading}
        variant="outline"
        size="sm"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileUp className="mr-2 h-4 w-4" />
        )}
        {buttonText}
      </Button>

      {status === "error" && error && (
        <p className="ml-2 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

