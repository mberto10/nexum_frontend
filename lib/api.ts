
'use client';

import { type ClassValue, clsx } from "clsx";

export type CommandResponse = {
  content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-repl-url.replit.dev';

export async function fetchFromAPI(command: string, type: string, entryId: string): Promise<CommandResponse> {
  // Remove trailing slash from base URL if present
  const baseUrl = API_BASE_URL.replace(/\/+$/, '');
  const response = await fetch(`${baseUrl}/api/command`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ command, type, entryId }),
  });

  if (!response.ok) {
    const message = `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}
