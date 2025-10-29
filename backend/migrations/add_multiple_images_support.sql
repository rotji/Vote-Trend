-- Migration: Support multiple images per poll
-- Add poll_images table to store multiple images per poll

-- Create poll_images table
CREATE TABLE IF NOT EXISTS poll_images (
  id SERIAL PRIMARY KEY,
  poll_id INTEGER NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  image_description VARCHAR(200), -- e.g., "Donald Trump", "Joe Biden"
  display_order INTEGER DEFAULT 1, -- Order for displaying images
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_poll_images_poll_id ON poll_images(poll_id);
CREATE INDEX IF NOT EXISTS idx_poll_images_order ON poll_images(poll_id, display_order);

-- Optional: Add a main_image_url to polls table for backward compatibility
ALTER TABLE polls ADD COLUMN IF NOT EXISTS main_image_url VARCHAR(500);

-- Verify the changes
\d poll_images;