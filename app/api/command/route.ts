
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { command, type, entryId } = await request.json();
    console.log('API received request:', { command, type, entryId });
    
    // Mock response - replace with actual implementation
    const response = {
      content: `Executed ${command} with ${type} (ID: ${entryId})`
    };
    
    console.log('API sending response:', response);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process command' }, 
      { status: 500 }
    );
  }
}
