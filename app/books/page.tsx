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
  category_id: string;
  stock: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Get user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      setUser(authUser);

      // Fetch categories
      const { data: categoryData } = await supabase.from('categories').select('*');
      if (categoryData) setCategories(categoryData);

      // Fetch books
      const { data: bookData } = await supabase.from('books').select('*');
      if (bookData) {
        setBooks(bookData);
        setFilteredBooks(bookData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = books;

    if (selectedCategory) {
      filtered = filtered.filter((book) => book.category_id === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchQuery, books]);

  return (
    <>
      <Header user={user} />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Collections</h1>
            <p className="text-lg text-muted-foreground">Browse our extensive collection of {books.length} books</p>
          </div>

          {/* Filters Section */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Search Books</label>
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              {(selectedCategory || searchQuery) && (
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                    }}
                    className="w-full lg:w-auto px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-muted-foreground">
            Showing {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-80 rounded-xl mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-3"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
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
                        {book.description && (
                          <p className="text-muted-foreground text-sm line-clamp-2">{book.description}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-accent font-bold text-xl">
                          ${typeof book.price === 'string' ? parseFloat(book.price).toFixed(2) : book.price.toFixed(2)}
                        </p>
                        {book.stock <= 5 && book.stock > 0 && (
                          <span className="text-xs font-semibold bg-accent/20 text-accent px-2 py-1 rounded">
                            Only {book.stock} left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
              <p className="text-3xl mb-4">🔍</p>
              <p className="text-muted-foreground text-lg mb-6">No books found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
