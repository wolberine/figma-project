import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const VaultContext = createContext();

export const useVaults = () => useContext(VaultContext);

export const VaultProvider = ({ children }) => {
    const [vaults, setVaults] = useState([]);
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

    const addVault = async (newVault) => {
        try {
            const { data, error } = await supabase
                .from('vaults')
                .insert([{ ...newVault, id: newVault.code.toLowerCase() }])
                .select();

            if (error) throw error;
            setVaults([...vaults, data[0]]);
        } catch (error) {
            console.error('Error adding vault:', error);
            alert('Error adding vault');
        }
    };

    const updateVault = async (id, updatedData) => {
        try {
            const { error } = await supabase
                .from('vaults')
                .update(updatedData)
                .eq('id', id);

            if (error) throw error;
            setVaults(vaults.map(v => v.id === id ? { ...v, ...updatedData } : v));
        } catch (error) {
            console.error('Error updating vault:', error);
            alert('Error updating vault');
        }
    };

    const deleteVault = async (id) => {
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

    const getVault = (id) => vaults.find(v => v.id === id);

    return (
        <VaultContext.Provider value={{ vaults, addVault, updateVault, deleteVault, getVault, loading }}>
            {children}
        </VaultContext.Provider>
    );
};
