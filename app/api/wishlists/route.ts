import { NextRequest, NextResponse } from 'next/server';
import { readJson, writeJson } from '@/lib/fileStorage';
import { Wishlist } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  const wishlists = await readJson<Wishlist[]>('wishlists.json');
  return NextResponse.json(wishlists);
}

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const wishlists = await readJson<Wishlist[]>('wishlists.json');
  const newWishlist: Wishlist = {
    id: uuidv4(),
    name,
    description,
    products: [],
  };
  wishlists.push(newWishlist);
  await writeJson('wishlists.json', wishlists);

  return NextResponse.json(newWishlist, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { wishlistId, name } = await req.json();

  const wishlists = await readJson<Wishlist[]>('wishlists.json');
  const wishlist = wishlists.find(w => w.id === wishlistId);

  if (!wishlist || !name) {
    return NextResponse.json({ error: 'wishlistId and name are required' }, { status: 400 });
  }
  wishlist.name = name;
  await writeJson('wishlists.json', wishlists);
  return NextResponse.json({ success: true, wishlist });
}

export async function DELETE(req: NextRequest) {
  const { wishlistId } = await req.json();
  if (!wishlistId) {
    return NextResponse.json({ error: 'wishlistId is required' }, { status: 400 });
  }

  let wishlists = await readJson<Wishlist[]>('wishlists.json');
  const wishlist = wishlists.find(w => w.id === wishlistId);
  if (!wishlist) {
    return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
  }

  wishlists = wishlists.filter(w => w.id !== wishlistId);
  await writeJson('wishlists.json', wishlists);

  return NextResponse.json({ success: true });
}