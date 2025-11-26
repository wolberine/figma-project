import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const PhaseContext = createContext();

export const usePhases = () => useContext(PhaseContext);

export const PhaseProvider = ({ children }) => {
    const [phases, setPhases] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPhases = async () => {
        try {
            const { data, error } = await supabase
                .from('phases')
                .select('*')
                .order('step_number', { ascending: true });

            if (error) throw error;
            setPhases(data || []);
        } catch (error) {
            console.error('Error fetching phases:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhases();
    }, []);

    const uploadImage = async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('carousel-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('carousel-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const deleteImage = async (imageUrl) => {
        try {
            // Extract file path from URL
            const urlParts = imageUrl.split('/');
            const filePath = urlParts[urlParts.length - 1];

            const { error } = await supabase.storage
                .from('carousel-images')
                .remove([filePath]);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const addPhase = async (phaseData, imageFile) => {
        try {
            let imageUrl = phaseData.image;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const { data, error } = await supabase
                .from('phases')
                .insert([{ ...phaseData, image: imageUrl }])
                .select();

            if (error) throw error;
            setPhases([...phases, data[0]].sort((a, b) => a.step_number - b.step_number));
            return data[0];
        } catch (error) {
            console.error('Error adding phase:', error);
            throw error;
        }
    };

    const updatePhase = async (id, phaseData, imageFile) => {
        try {
            const oldPhase = phases.find(p => p.id === id);
            let imageUrl = phaseData.image;

            if (imageFile) {
                // Delete old image if it's from storage
                if (oldPhase?.image?.includes('carousel-images')) {
                    await deleteImage(oldPhase.image);
                }
                imageUrl = await uploadImage(imageFile);
            }

            const { error } = await supabase
                .from('phases')
                .update({ ...phaseData, image: imageUrl })
                .eq('id', id);

            if (error) throw error;
            setPhases(phases.map(p => p.id === id ? { ...p, ...phaseData, image: imageUrl } : p));
        } catch (error) {
            console.error('Error updating phase:', error);
            throw error;
        }
    };

    const deletePhase = async (id) => {
        try {
            const phase = phases.find(p => p.id === id);

            // Delete image if it's from storage
            if (phase?.image?.includes('carousel-images')) {
                await deleteImage(phase.image);
            }

            const { error } = await supabase
                .from('phases')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setPhases(phases.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting phase:', error);
            throw error;
        }
    };

    return (
        <PhaseContext.Provider value={{ phases, addPhase, updatePhase, deletePhase, loading }}>
            {children}
        </PhaseContext.Provider>
    );
};
