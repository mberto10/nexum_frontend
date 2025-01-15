from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://2c9e21e6-fd5d-45b4-8580-84b7305a5ae4-00-h4gay4hmypih.kirk.replit.dev",
        "https://*.replit.dev"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    max_age=3600
)

@app.get("/api/command")
async def root():
    return {"message": "Command received"}


# Frontend Code (example using fetch)
// api.ts
async function fetchFromAPI(command) {
    const response = await fetch('https://a68f36bf-ada4-4a0f-ae49-a7fc88d3e949-00-2r06l51igi0p6.worf.replit.dev:3000/api/command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export default fetchFromAPI;

//In your React component (example)

import React, { useState } from 'react';
import fetchFromAPI from './api';


function MyComponent() {
  const [result, setResult] = useState(null);
  const [command, setCommand] = useState('');


  const handleCommand = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchFromAPI(command);
      setResult(data.message);
    } catch (error) {
      console.error("Command execution failed:", error);
      setResult("Error: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommand}>
        <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default MyComponent;