import { NextRequest, NextResponse } from 'next/server';
import { readJson, writeJson } from '@/lib/fileStorage';
import { Wishlist } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const wishlists = await readJson<Wishlist[]>('wishlists.json');
  const userWishlists = wishlists.filter(wishlist => wishlist.userId === userId);
  return NextResponse.json(userWishlists);
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, description } = await req.json();
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const wishlists = await readJson<Wishlist[]>('wishlists.json');
  const newWishlist: Wishlist = {
    id: uuidv4(),
    userId,
    name,
    description,
    isPublic: false,
    products: [],
  };
  wishlists.push(newWishlist);
  await writeJson('wishlists.json', wishlists);

  return NextResponse.json(newWishlist, { status: 201 });
}

// PATCH: Handles multiple actions: rename, set public/private
export async function PATCH(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    action,
    wishlistId,
    name,
    isPublic,
  } = await req.json();

  const wishlists = await readJson<Wishlist[]>('wishlists.json');
  const wishlist = wishlists.find(w => w.id === wishlistId && w.userId === userId);

  switch (action) {
    case 'rename':
      if (!wishlist || !name) {
        return NextResponse.json({ error: 'wishlistId and name are required' }, { status: 400 });
      }
      wishlist.name = name;
      await writeJson('wishlists.json', wishlists);
      return NextResponse.json({ success: true, wishlist });

    case 'setPublic':
      if (!wishlist || typeof isPublic !== 'boolean') {
        return NextResponse.json({ error: 'wishlistId and isPublic are required' }, { status: 400 });
      }
      wishlist.isPublic = isPublic;
      if (isPublic && !wishlist.publicId) {
        wishlist.publicId = uuidv4();
      }
      await writeJson('wishlists.json', wishlists);
      return NextResponse.json({ success: true, wishlist });

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}

// DELETE: Remove wishlist (expects { wishlistId } in body)
export async function DELETE(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { wishlistId } = await req.json();
  if (!wishlistId) {
    return NextResponse.json({ error: 'wishlistId is required' }, { status: 400 });
  }

  let wishlists = await readJson<Wishlist[]>('wishlists.json');
  const wishlist = wishlists.find(w => w.id === wishlistId && w.userId === userId);
  if (!wishlist) {
    return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
  }

  wishlists = wishlists.filter(w => w.id !== wishlistId);
  await writeJson('wishlists.json', wishlists);

  return NextResponse.json({ success: true });
}