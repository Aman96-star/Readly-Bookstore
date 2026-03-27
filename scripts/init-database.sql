-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Books table
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  isbn VARCHAR(20),
  category_id UUID REFERENCES categories(id),
  cover_image_url VARCHAR(500),
  stock INT DEFAULT 0,
  published_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping Cart table
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES books(id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_books_category_id ON books(category_id);
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Row Level Security Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users can read all users
CREATE POLICY "Users can read all users"
  ON users FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Everyone can read books
CREATE POLICY "Everyone can read books"
  ON books FOR SELECT
  USING (true);

-- Only admins can insert/update/delete books
CREATE POLICY "Only admins can insert books"
  ON books FOR INSERT
  WITH CHECK ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Only admins can update books"
  ON books FOR UPDATE
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete books"
  ON books FOR DELETE
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

-- Everyone can read categories
CREATE POLICY "Everyone can read categories"
  ON categories FOR SELECT
  USING (true);

-- Only admins can manage categories
CREATE POLICY "Only admins can insert categories"
  ON categories FOR INSERT
  WITH CHECK ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Only admins can update categories"
  ON categories FOR UPDATE
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete categories"
  ON categories FOR DELETE
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

-- Users can read their own cart items
CREATE POLICY "Users can read own cart items"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own cart items
CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items
CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own cart items
CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- Users can read their own orders
CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert orders for themselves
CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only admins can update orders
CREATE POLICY "Only admins can update orders"
  ON orders FOR UPDATE
  USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

-- Users can read order items for their orders
CREATE POLICY "Users can read own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );
