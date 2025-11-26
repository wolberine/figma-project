import React, { useState } from 'react';
import Layout from '../components/Layout';
import VaultForm from '../components/VaultForm';
import { useVaults } from '../context/VaultContext';

const AdminDashboard = () => {
    const { vaults, addVault, updateVault, deleteVault } = useVaults();
    const [isEditing, setIsEditing] = useState(false);
    const [currentVault, setCurrentVault] = useState(null);

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

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="font-serif italic text-5xl">Vault CMS</h1>
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
                        <h2 className="font-serif italic text-3xl mb-8">{currentVault ? 'Edit Vault' : 'Create New Vault'}</h2>
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
            </div>
        </Layout>
    );
};

export default AdminDashboard;
