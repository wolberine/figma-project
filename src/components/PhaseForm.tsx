import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Database } from '../types/supabase';

type Phase = Database['public']['Tables']['phases']['Row'];
type PhaseInsert = Database['public']['Tables']['phases']['Insert'];

interface PhaseFormProps {
    phase: Phase | null;
    onSubmit: (data: Omit<PhaseInsert, 'image'> & { image: string }, file: File | null) => Promise<void>;
    onCancel?: () => void;
}

const PhaseForm: React.FC<PhaseFormProps> = ({ phase, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Omit<PhaseInsert, 'image'> & { image: string }>({
        step_number: 0,
        title: '',
        description: '',
        image: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (phase) {
            setFormData({
                step_number: phase.step_number,
                title: phase.title,
                description: phase.description,
                image: phase.image
            });
            setImagePreview(phase.image);
        }
    }, [phase]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'step_number' ? parseInt(value) : value
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB');
                return;
            }

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData, imageFile);
            // Reset form
            setFormData({
                step_number: 0,
                title: '',
                description: '',
                image: ''
            });
            setImageFile(null);
            setImagePreview('');
        } catch (error: any) {
            alert('Error saving phase: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-surface border border-white/10 p-6 space-y-4">
            <h3 className="font-serif italic text-2xl mb-4">
                {phase ? 'Edit Phase' : 'Add New Phase'}
            </h3>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                    Step Number
                </label>
                <input
                    type="number"
                    name="step_number"
                    value={formData.step_number}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-gold"
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Step 1: Deposit Stablecoins"
                    className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-gold"
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Describe this step..."
                    className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-gold resize-none"
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                    Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-gold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:font-bold file:text-xs file:uppercase file:tracking-widest hover:file:bg-white file:cursor-pointer"
                />
                {imagePreview && (
                    <div className="mt-4">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-xs max-h-48 object-contain bg-black border border-white/10"
                        />
                    </div>
                )}
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-white text-black py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : (phase ? 'Update Phase' : 'Add Phase')}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-white/5 text-white py-3 text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default PhaseForm;
