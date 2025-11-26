-- Rename existing column to solana_wallet_address
ALTER TABLE vaults RENAME COLUMN wallet_address TO solana_wallet_address;

-- Add new column for ethereum_wallet_address
ALTER TABLE vaults ADD COLUMN ethereum_wallet_address text;

-- Optional: Set a default Ethereum address for existing rows if needed
-- UPDATE vaults SET ethereum_wallet_address = '0x...' WHERE ethereum_wallet_address IS NULL;
