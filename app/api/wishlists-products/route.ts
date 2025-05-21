import { NextRequest, NextResponse } from 'next/server';
import { readJson, writeJson } from '@/lib/fileStorage';
import { Wishlist } from '@/types';

export async function PATCH(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    action,
    wishlistId,
    productId,
    fromWishlistId,
    toWishlistId,
  } = await req.json();

  const wishlists = await readJson<Wishlist[]>('wishlists.json');
  const wishlist = wishlists.find(w => w.id === wishlistId && w.userId === userId);

  switch (action) {
    case 'addProduct':
      if (!wishlist || !productId) {
        return NextResponse.json({ error: 'wishlistId and productId are required' }, { status: 400 });
      }
      if (wishlist.products.some(p => p.productId === productId)) {
        return NextResponse.json({ error: 'Product already in wishlist' }, { status: 400 });
      }
      wishlist.products.push({
        productId,
        addedAt: new Date().toISOString(),
        priceAtAdd: 0, // Optionally fetch price
      });
      await writeJson('wishlists.json', wishlists);
      return NextResponse.json({ success: true, wishlist });

    case 'removeProduct':
      if (!wishlist || !productId) {
        return NextResponse.json({ error: 'wishlistId and productId are required' }, { status: 400 });
      }
      wishlist.products = wishlist.products.filter(p => p.productId !== productId);
      await writeJson('wishlists.json', wishlists);
      return NextResponse.json({ success: true, wishlist });

    case 'moveProduct':
      if (!fromWishlistId || !toWishlistId || !productId) {
        return NextResponse.json({ error: 'fromWishlistId, toWishlistId and productId are required' }, { status: 400 });
      }
      const fromWishlist = wishlists.find(w => w.id === fromWishlistId && w.userId === userId);
      const toWishlist = wishlists.find(w => w.id === toWishlistId && w.userId === userId);
      if (!fromWishlist || !toWishlist) {
        return NextResponse.json({ error: 'Wishlists not found' }, { status: 404 });
      }
      const prod = fromWishlist.products.find(p => p.productId === productId);
      if (!prod) {
        return NextResponse.json({ error: 'Product not found in source wishlist' }, { status: 404 });
      }
      if (toWishlist.products.some(p => p.productId === productId)) {
        return NextResponse.json({ error: 'Product already in target wishlist' }, { status: 400 });
      }
      fromWishlist.products = fromWishlist.products.filter(p => p.productId !== productId);
      toWishlist.products.push(prod);
      await writeJson('wishlists.json', wishlists);
      return NextResponse.json({ success: true });

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}