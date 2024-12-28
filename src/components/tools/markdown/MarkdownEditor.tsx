"use client"

import React, { useState } from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import * as Showdown from 'showdown';

const converter = new Showdown.Converter();

export default function MarkdownEditor() {
  const [value, setValue] = useState<string>('');

  const handleSave = async () => {
    try {
      // (Optional) Save the content to your Next.js API route
      const response = await fetch('/api/save-markdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'my-new-doc', // or a dynamic user-input filename
          content: value,
        }),
      });

      if (response.ok) {
        alert('File saved successfully!');
      } else {
        alert('Error saving file!');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving file!');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab="write"
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
