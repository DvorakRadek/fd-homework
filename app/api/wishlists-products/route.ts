import { NextRequest, NextResponse } from 'next/server';
import { readJson, writeJson } from '@/lib/fileStorage';
import { Wishlist } from '@/types';

export async function PATCH(req: NextRequest) {
  const {
    action,
    wishlistId,
    product,
  } = await req.json();

  const wishlists = await readJson<Wishlist[]>('wishlists.json');
  const wishlist = wishlists.find(w => w.id === wishlistId);

  switch (action) {
    case 'addProduct':
      if (!wishlist || !product.id) {
        return NextResponse.json({ error: 'wishlistId and productId are required' }, { status: 400 });
      }
      if (wishlist.products.some(p => p.id === product.id)) {
        return NextResponse.json({ error: 'Product already in wishlist' }, { status: 400 });
      }
      wishlist.products.push({
        ...product
      });
      await writeJson('wishlists.json', wishlists);
      return NextResponse.json({ success: true, wishlist });

    case 'removeProduct':
      if (!wishlist || !product.id) {
        return NextResponse.json({ error: 'wishlistId and productId are required' }, { status: 400 });
      }
      wishlist.products = wishlist.products.filter(p => p.id !== product.id);
      await writeJson('wishlists.json', wishlists);
      return NextResponse.json({ success: true, wishlist });

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}