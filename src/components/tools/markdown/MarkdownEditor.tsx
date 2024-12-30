"use client"

import React, { useState } from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import * as Showdown from 'showdown';

// Function to save a markdown file
const saveMarkdownFile = (content: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp
    const filename = `/temp/${timestamp}.md`;

    // Create a link element for downloading
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const App = () => {
    const [value, setValue] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

    const converter = new Showdown.Converter();

    return (
        <div>
            <h1>Markdown Editor</h1>
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={(tab) => setSelectedTab(tab)}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
            <button onClick={() => saveMarkdownFile(value)} style={{ marginTop: '10px' }}>
                Save
            </button>
        </div>
    );
};

export default App;
