-- Add wallet_address column to vaults table
ALTER TABLE vaults ADD COLUMN wallet_address text;

-- Update existing vaults with a default address (optional, using the Solana one for now)
UPDATE vaults SET wallet_address = 'B4bAbipNRXjtcbs78t6dBKWXwd4tkLu5kUvsH2Txds5J' WHERE wallet_address IS NULL;
