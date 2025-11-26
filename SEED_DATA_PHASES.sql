-- Create phases table for How It Works carousel
create table phases (
  id text primary key,
  step_number integer not null,
  title text not null,
  description text not null,
  image text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert seed data for carousel phases
insert into phases (id, step_number, title, description, image) values
('step0', 0, 'Step 0: Protocol KYB', 'All parties (Liquidity Providers, Factories, Suppliers, etc.) are vetted and KYB''d by the protocol.', '/assets/step0.png'),
('step1', 1, 'Step 1: Deposit Stablecoins', 'Liquidity providers deposit stablecoins into the protocol to earn yield.', '/assets/step1.png'),
('step2', 2, 'Step 2: Deploy Capital', 'Capital is deployed to fund shipments of real-world assets, vetted by NMC and risk managers.', '/assets/step2.png'),
('step3', 3, 'Step 3: Capital Repayment', 'Underwritten buyers are invoiced and pay back the capital plus fees.', '/assets/step3.png'),
('step4', 4, 'Step 4: Distribute Rewards', 'Principal and yield are returned to vaults, and $SHIPCOIN rewards are distributed to participants.', '/assets/step4.png');
