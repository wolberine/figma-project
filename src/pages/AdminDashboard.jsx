import React, { useState } from 'react';
import Layout from '../components/Layout';
import VaultForm from '../components/VaultForm';
import PhaseForm from '../components/PhaseForm';
import PhaseList from '../components/PhaseList';
import { useVaults } from '../context/VaultContext';
import { usePhases } from '../context/PhaseContext';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const { vaults, addVault, updateVault, deleteVault } = useVaults();
    const { addPhase, updatePhase } = usePhases();
    const [activeTab, setActiveTab] = useState('vaults'); // 'vaults' or 'carousel'
    const [isEditing, setIsEditing] = useState(false);
    const [currentVault, setCurrentVault] = useState(null);
    const [currentPhase, setCurrentPhase] = useState(null);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const handleCreate = () => {
        setCurrentVault(null);
        setIsEditing(true);
    };

    const handleEdit = (vault) => {
        setCurrentVault(vault);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this vault?')) {
            deleteVault(id);
        }
    };

    const handleSubmit = (data) => {
        if (currentVault) {
            updateVault(currentVault.id, data);
        } else {
            addVault(data);
        }
        setIsEditing(false);
        setCurrentVault(null);
    };

    const handlePhaseSubmit = async (phaseData, imageFile) => {
        if (currentPhase) {
            await updatePhase(currentPhase.id, phaseData, imageFile);
            setCurrentPhase(null);
        } else {
            await addPhase(phaseData, imageFile);
        }
    };

    const handlePhaseEdit = (phase) => {
        setCurrentPhase(phase);
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Header with Tabs */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="font-serif italic text-5xl">Admin Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-4 border-b border-white/10">
                        <button
                            onClick={() => {
                                setActiveTab('vaults');
                                setIsEditing(false);
                                setCurrentPhase(null);
                            }}
                            className={`px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'vaults'
                                ? 'border-b-2 border-gold text-gold'
                                : 'text-secondary hover:text-white'
                                }`}
                        >
                            Vaults
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('carousel');
                                setIsEditing(false);
                                setCurrentVault(null);
                            }}
                            className={`px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'carousel'
                                ? 'border-b-2 border-gold text-gold'
                                : 'text-secondary hover:text-white'
                                }`}
                        >
                            Carousel
                        </button>
                    </div>
                </div>

                {/* Vaults Tab Content */}
                {activeTab === 'vaults' && (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-serif italic text-3xl">Vault Management</h2>
                            {!isEditing && (
                                <button
                                    onClick={handleCreate}
                                    className="px-6 py-3 bg-gold text-black text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
                                >
                                    + New Vault
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="max-w-3xl mx-auto">
                                <h3 className="font-serif italic text-2xl mb-8">{currentVault ? 'Edit Vault' : 'Create New Vault'}</h3>
                                <VaultForm
                                    initialData={currentVault}
                                    onSubmit={handleSubmit}
                                    onCancel={() => setIsEditing(false)}
                                />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="py-4 text-xs font-bold text-secondary uppercase tracking-widest">Code</th>
                                            <th className="py-4 text-xs font-bold text-secondary uppercase tracking-widest">Title</th>
                                            <th className="py-4 text-xs font-bold text-secondary uppercase tracking-widest">Category</th>
                                            <th className="py-4 text-xs font-bold text-secondary uppercase tracking-widest">APY</th>
                                            <th className="py-4 text-xs font-bold text-secondary uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vaults.map(vault => (
                                            <tr key={vault.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-4 font-mono text-gold">{vault.code}</td>
                                                <td className="py-4 font-medium">{vault.title}</td>
                                                <td className="py-4 text-secondary capitalize">{vault.category}</td>
                                                <td className="py-4 font-mono">{vault.apy}</td>
                                                <td className="py-4 text-right space-x-4">
                                                    <button
                                                        onClick={() => handleEdit(vault)}
                                                        className="text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(vault.id)}
                                                        className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}

                {/* Carousel Tab Content */}
                {activeTab === 'carousel' && (
                    <div className="space-y-12">
                        <div>
                            <h2 className="font-serif italic text-3xl mb-8">Carousel Management</h2>
                            <PhaseForm
                                phase={currentPhase}
                                onSubmit={handlePhaseSubmit}
                                onCancel={currentPhase ? () => setCurrentPhase(null) : null}
                            />
                        </div>
                        <PhaseList onEdit={handlePhaseEdit} />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdminDashboard;
