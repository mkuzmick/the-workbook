"use client";

import React, { useState } from "react";

const MarkdownNoteEditor = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/save-markdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: markdown }),
      });

      if (!response.ok) {
        throw new Error("Failed to save markdown.");
      }

      alert("Markdown saved successfully!");
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
