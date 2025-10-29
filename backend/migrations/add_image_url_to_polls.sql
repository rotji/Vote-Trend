-- Migration: Add image_url column to polls table
-- Run this if you get database errors when creating polls with images

-- Add image_url column to polls table
ALTER TABLE polls ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- Create index for faster queries (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_polls_image_url ON polls(image_url);

-- Verify the change
\d polls;