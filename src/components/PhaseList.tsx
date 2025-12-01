import React, { useState } from 'react';
import { usePhases } from '../context/PhaseContext';
import { Database } from '../types/supabase';

type Phase = Database['public']['Tables']['phases']['Row'];

interface PhaseListProps {
    onEdit: (phase: Phase) => void;
}

const PhaseList: React.FC<PhaseListProps> = ({ onEdit }) => {
    const { phases, deletePhase, loading } = usePhases();
    const [deleting, setDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeleting(id);

        try {
            await deletePhase(id);
        } catch (error: any) {
            alert('Error deleting phase: ' + error.message);
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return <div className="text-secondary text-center py-8">Loading phases...</div>;
    }

    if (phases.length === 0) {
        return (
            <div className="bg-surface border border-white/10 p-8 text-center text-secondary">
                No carousel phases yet. Add one above to get started.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="font-serif italic text-2xl mb-4">Existing Phases</h3>
            {phases.map((phase) => (
                <div
                    key={phase.id}
                    className="bg-surface border border-white/10 p-6 flex gap-6"
                >
                    {/* Image Preview */}
                    <div className="flex-shrink-0">
                        <img
                            src={phase.image}
                            alt={phase.title}
                            className="w-32 h-32 object-contain bg-black border border-white/10"
                        />
                    </div>

                    {/* Phase Info */}
                    <div className="flex-1">
                        <div className="text-gold text-xs font-bold uppercase tracking-widest mb-2">
                            Step {phase.step_number}
                        </div>
                        <h4 className="text-xl font-bold mb-2">{phase.title}</h4>
                        <p className="text-secondary text-sm">{phase.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                            onClick={() => onEdit(phase)}
                            type="button"
                            className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(phase.id)}
                            disabled={deleting === phase.id}
                            type="button"
                            className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {deleting === phase.id ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PhaseList;
