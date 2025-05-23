Key Solana Smart Contract Concepts

1. Programs as Smart Contracts

Solana smart contracts, called "programs," are stateless, read-only executables deployed on-chain. They define logic executed by external accounts, which store data separately. This separation enhances scalability by reducing on-chain storage needs.

2. Account Model

Solana uses an account-based model where accounts store data, balances, or program code. Each account has a unique address (public key), and programs interact with accounts to read or modify data. Accounts pay "rent" or must be rent-exempt to persist.

3. Program-Derived Addresses (PDAs)

PDAs are deterministic addresses generated from a program ID and seeds, allowing programs to control accounts without private keys. They enable secure, programmatic account management for complex interactions like cross-program invocations.
