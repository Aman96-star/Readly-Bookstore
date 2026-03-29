'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import Header from '@/components/Header';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image_url: string | null;
  description: string;
  stock: number;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Check if user is logged in
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      setUser(authUser);

      // Fetch books
      const { data, error } = await supabase.from('books').select('*').limit(6);

      if (!error && data) {
        setBooks(data);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header user={user} />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
                    Discover Your
                    <span className="text-primary block">Next Great Read</span>
                  </h1>
                </div>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Explore thousands of books across all genres. Find your next favorite title and join our community of passionate book lovers.
                </p>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <Link
                    href="/books"
                    className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/books"
                    className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300"
                  >
                    Browse Catalog
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div>
                    <p className="text-3xl font-bold text-primary">10K+</p>
                    <p className="text-sm text-muted-foreground">Books Available</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">50K+</p>
                    <p className="text-sm text-muted-foreground">Happy Readers</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm text-muted-foreground">Satisfied</p>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/50 to-accent/20 rounded-2xl transform rotate-3"></div>
                  <div className="relative bg-secondary rounded-2xl p-8 transform -rotate-2 shadow-2xl">
                    <div className="space-y-6">
                      <div className="h-40 bg-gradient-to-br from-accent/40 to-accent/20 rounded-lg flex items-center justify-center">
                        <span className="text-6xl">📚</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-accent/30 rounded w-3/4"></div>
                        <div className="h-4 bg-accent/20 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary py-16 sm:py-20 border-t border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="mb-6 text-5xl group-hover:scale-110 transition-transform duration-300">📚</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Curated Collection</h3>
                <p className="text-muted-foreground">Handpicked books from top authors and renowned publishers worldwide</p>
              </div>
              <div className="text-center group">
                <div className="mb-6 text-5xl group-hover:scale-110 transition-transform duration-300">🚚</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Fast Shipping</h3>
                <p className="text-muted-foreground">Quick and reliable delivery right to your doorstep</p>
              </div>
              <div className="text-center group">
                <div className="mb-6 text-5xl group-hover:scale-110 transition-transform duration-300">💳</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Secure Payment</h3>
                <p className="text-muted-foreground">Safe and encrypted transactions for complete peace of mind</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Featured Books</h2>
            <p className="text-lg text-muted-foreground">Discover our latest additions and bestsellers</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-80 rounded-xl mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-3"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-6">No books available yet</p>
              <Link
                href="/books"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Browse All Books
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <Link key={book.id} href={`/books/${book.id}`}>
                  <div className="group cursor-pointer h-full flex flex-col">
                    <div className="relative bg-card rounded-xl overflow-hidden mb-5 h-80 border border-border hover:border-accent transition-all duration-300 flex-shrink-0">
                      {book.image_url ? (
                        <img
                          src={book.image_url}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/40 flex items-center justify-center">
                          <span className="text-6xl opacity-50">📖</span>
                        </div>
                      )}
                      {book.stock <= 5 && book.stock > 0 && (
                        <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Only {book.stock} left
                        </div>
                      )}
                      {book.stock === 0 && (
                        <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition line-clamp-2 mb-1">
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">{book.author}</p>
                      </div>
                      <div>
                        <p className="text-accent font-bold text-xl">
                          ${typeof book.price === 'string' ? parseFloat(book.price).toFixed(2) : book.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/books"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Books →
            </Link>
          </div>
        </section>

        {/* Newsletter/CTA Section */}
        <section className="bg-primary text-white py-16 sm:py-20 border-t border-primary-dark">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 opacity-90">
              Discover exclusive offers, new releases, and literary recommendations delivered to your inbox
            </p>
            {user ? (
              <Link
                href="/books"
                className="inline-block bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all duration-300"
              >
                Start Shopping
              </Link>
            ) : (
              <Link
                href="/auth/signup"
                className="inline-block bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all duration-300"
              >
                Get Started Today
              </Link>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Readly</h3>
                <p className="text-muted-foreground text-sm">Your ultimate destination for discovering books and expanding your literary horizons.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li><Link href="/books" className="hover:text-primary transition">Books</Link></li>
                  <li><Link href="/books" className="hover:text-primary transition">Categories</Link></li>
                  {user && <li><Link href="/orders" className="hover:text-primary transition">My Orders</Link></li>}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li><Link href="#" className="hover:text-primary transition">Contact Us</Link></li>
                  <li><Link href="#" className="hover:text-primary transition">FAQ</Link></li>
                  <li><Link href="#" className="hover:text-primary transition">Shipping Info</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li><Link href="#" className="hover:text-primary transition">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-primary transition">Terms & Conditions</Link></li>
                  <li><Link href="#" className="hover:text-primary transition">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
              <p>&copy; 2024 Readly Bookstore. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
