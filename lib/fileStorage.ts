import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'storage');

export async function readJson<T>(file: string): Promise<T> {
  const filePath = path.join(dataDir, file);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function writeJson<T>(file: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}