export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            vaults: {
                Row: {
                    id: string
                    code: string
                    title: string
                    description: string
                    apy: string
                    tvl: string
                    inception: string
                    risk: string
                    category: string
                    incentivized: boolean
                    solana_wallet_address?: string | null
                    ethereum_wallet_address?: string | null
                    base_wallet_address?: string | null
                }
                Insert: {
                    id?: string
                    code: string
                    title: string
                    description: string
                    apy: string
                    tvl: string
                    inception: string
                    risk: string
                    category: string
                    incentivized?: boolean
                    solana_wallet_address?: string | null
                    ethereum_wallet_address?: string | null
                    base_wallet_address?: string | null
                }
                Update: {
                    id?: string
                    code?: string
                    title?: string
                    description?: string
                    apy?: string
                    tvl?: string
                    inception?: string
                    risk?: string
                    category?: string
                    incentivized?: boolean
                    solana_wallet_address?: string | null
                    ethereum_wallet_address?: string | null
                    base_wallet_address?: string | null
                }
            }
            phases: {
                Row: {
                    id: string
                    step_number: number
                    title: string
                    description: string
                    image: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    step_number: number
                    title: string
                    description: string
                    image: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    step_number?: number
                    title?: string
                    description?: string
                    image?: string
                    created_at?: string
                }
            }
        }
    }
}
