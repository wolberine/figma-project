ALTER TABLE vaults 
ADD COLUMN base_wallet_address TEXT;

COMMENT ON COLUMN vaults.base_wallet_address IS 'Wallet address for receiving funds on Base network';
