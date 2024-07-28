import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('filePath');

  if (!filePath) {
    return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), filePath);

  console.log('Attempting to read file:', fullPath);

  try {
    const fileContent = await fs.readFile(fullPath, 'utf8');
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error(`Failed to read file: ${fullPath}`, error);
    return NextResponse.json(
      {
        error: 'Failed to read file',
        details: error instanceof Error ? error.message : String(error),
        path: fullPath,
      },
      { status: 500 },
    );
  }
}
