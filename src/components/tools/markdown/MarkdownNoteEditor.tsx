"use client";

import React, { useState, useEffect } from "react";

// Define the type for the timestamps
type Timestamps = {
  unix: string; // Unix timestamp in milliseconds as a string
  utc: string;  // ISO 8601 UTC format
  local: string; // Local time string with timezone
};

const MarkdownNoteEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [initiationTime, setInitiationTime] = useState<Timestamps>({
    unix: "",
    utc: "",
    local: "",
  });

  // Function to generate timestamps in multiple formats
  const generateTimestamps = (): Timestamps => {
    const now = new Date();
    const unix = now.getTime().toString(); // Unix timestamp in milliseconds
    const utc = now.toISOString(); // ISO 8601 UTC format
    const local = now.toLocaleString("en-US", { timeZoneName: "short" }); // Local time with timezone
    return { unix, utc, local };
  };

  // Set initiation time when the component is mounted or markdown is cleared
  useEffect(() => {
    setInitiationTime(generateTimestamps());
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);

    // Reset initiation time if the markdown is cleared
    if (event.target.value === "") {
      setInitiationTime(generateTimestamps());
    }
  };

  const handleSubmit = async () => {
    try {
      const submissionTime = generateTimestamps();
  
      const response = await fetch("/api/save-markdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: markdown,
          initiationTime,
          submissionTime,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save markdown.");
      }
  
      alert("Markdown saved successfully!");
  
      // Clear the textarea content and reset initiation time
      setMarkdown("");
      setInitiationTime(generateTimestamps());
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <h1>Markdown Note Editor</h1>
      <textarea
        value={markdown}
        onChange={handleInputChange}
        placeholder="Type your markdown here..."
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MarkdownNoteEditor;
