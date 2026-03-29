'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth-actions';
import Header from '@/components/Header';

interface CartItem {
  id: string;
  book_id: string;
  quantity: number;
  book: {
    id: string;
    title: string;
    price: number;
    author: string;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const authUser = await getCurrentUser();
        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        setUser(authUser);

        const supabase = createClient();
        const { data, error } = await supabase
          .from('cart_items')
          .select(
            `
            id,
            book_id,
            quantity,
            book:books(id, title, price, author)
          `
          )
          .eq('user_id', authUser.id);

        if (!error && data) {
          setCartItems(data as any);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const updateQuantity = async (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(cartId);
      return;
    }

    const supabase = createClient();
    await supabase.from('cart_items').update({ quantity: newQuantity }).eq('id', cartId);

    setCartItems(
      cartItems.map((item) =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (cartId: string) => {
    const supabase = createClient();
    await supabase.from('cart_items').delete().eq('id', cartId);

    setCartItems(cartItems.filter((item) => item.id !== cartId));
  };

  const total = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <>
      <Header user={user} />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-muted-foreground">Loading your cart...</p>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-xl">
              <p className="text-5xl mb-4">🛒</p>
              <p className="text-muted-foreground text-lg mb-8">Your cart is empty</p>
              <Link href="/books" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                    <div className="flex gap-6">
                      {/* Book Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.book.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{item.book.author}</p>
                        <p className="text-accent font-bold text-xl">${(item.book.price * item.quantity).toFixed(2)}</p>
                        <p className="text-muted-foreground text-xs mt-1">${item.book.price.toFixed(2)} each</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center border border-border rounded-lg bg-background">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-muted transition text-foreground font-semibold"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 border-l border-r border-border text-foreground font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-muted transition text-foreground font-semibold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 font-semibold text-sm hover:bg-red-50 px-3 py-1 rounded transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-8 sticky top-20 shadow-lg">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-foreground">
                      <span>Subtotal</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span>Tax</span>
                      <span className="font-semibold">${(total * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="text-accent font-bold text-2xl">${(total * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl mb-3"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/books"
                    className="block text-center bg-muted text-foreground px-4 py-3 rounded-lg font-semibold hover:bg-muted/80 transition"
                  >
                    Continue Shopping
                  </Link>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Secure checkout powered by Supabase
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
