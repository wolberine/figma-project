import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Vault = Database['public']['Tables']['vaults']['Row'];
type VaultInsert = Database['public']['Tables']['vaults']['Insert'];
type VaultUpdate = Database['public']['Tables']['vaults']['Update'];

interface VaultContextType {
    vaults: Vault[];
    addVault: (newVault: VaultInsert) => Promise<void>;
    updateVault: (id: string, updatedData: VaultUpdate) => Promise<void>;
    deleteVault: (id: string) => Promise<void>;
    getVault: (id: string) => Vault | undefined;
    loading: boolean;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const useVaults = () => {
    const context = useContext(VaultContext);
    if (context === undefined) {
        throw new Error('useVaults must be used within a VaultProvider');
    }
    return context;
};

interface VaultProviderProps {
    children: ReactNode;
}

export const VaultProvider: React.FC<VaultProviderProps> = ({ children }) => {
    const [vaults, setVaults] = useState<Vault[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVaults = async () => {
        try {
            const { data, error } = await supabase
                .from('vaults')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;
            setVaults(data || []);
        } catch (error) {
            console.error('Error fetching vaults:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVaults();
    }, []);

    const addVault = async (newVault: VaultInsert) => {
        try {
            const { data, error } = await supabase
                .from('vaults')
                .insert([{ ...newVault, id: newVault.code.toLowerCase() }] as any)
                .select();

            if (error) throw error;
            if (data) {
                setVaults([...vaults, data[0]]);
            }
        } catch (error) {
            console.error('Error adding vault:', error);
            alert('Error adding vault');
        }
    };

    const updateVault = async (id: string, updatedData: VaultUpdate) => {
        try {
            const { error } = await supabase
                .from('vaults')
                // @ts-ignore
                .update(updatedData as any)
                .eq('id', id);

            if (error) throw error;
            setVaults(vaults.map(v => v.id === id ? { ...v, ...updatedData } as Vault : v));
        } catch (error) {
            console.error('Error updating vault:', error);
            alert('Error updating vault');
        }
    };

    const deleteVault = async (id: string) => {
        try {
            const { error } = await supabase
                .from('vaults')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setVaults(vaults.filter(v => v.id !== id));
        } catch (error) {
            console.error('Error deleting vault:', error);
            alert('Error deleting vault');
        }
    };

    const getVault = (id: string) => vaults.find(v => v.id === id);

    return (
        <VaultContext.Provider value={{ vaults, addVault, updateVault, deleteVault, getVault, loading }}>
            {children}
        </VaultContext.Provider>
    );
};
