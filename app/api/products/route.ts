import { NextResponse } from 'next/server';
import { readJson } from '@/lib/fileStorage';
import { Product } from '@/types';

export async function GET() {
  const products = await readJson<Product[]>('products.json');
  return NextResponse.json(products);
}