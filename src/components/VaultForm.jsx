import React, { useState, useEffect } from 'react';

const VaultForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        code: '',
        title: '',
        description: '',
        apy: '',
        tvl: '',
        inception: '',
        risk: '',
        category: 'customized',
        incentivized: false
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-surface border border-white/10 p-8 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Code */}
                <div>
                    <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">Code</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="e.g. NMCWS"
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="Vault Name"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors appearance-none"
                    >
                        <option value="flagship">Flagship</option>
                        <option value="customized">Customized Autopilot</option>
                        <option value="additional">Additional Vaults</option>
                        <option value="guarantor">Guarantor Funds</option>
                    </select>
                </div>

                {/* APY */}
                <div>
                    <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">APY</label>
                    <input
                        type="text"
                        name="apy"
                        value={formData.apy}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="e.g. 24.39%"
                    />
                </div>

                {/* TVL */}
                <div>
                    <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">TVL</label>
                    <input
                        type="text"
                        name="tvl"
                        value={formData.tvl}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="e.g. $124,592,000"
                    />
                </div>

                {/* Inception */}
                <div>
                    <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">Inception Date</label>
                    <input
                        type="text"
                        name="inception"
                        value={formData.inception}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="e.g. Oct 24, 2023"
                    />
                </div>

                {/* Risk */}
                <div>
                    <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">Risk Rating</label>
                    <input
                        type="text"
                        name="risk"
                        value={formData.risk}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="e.g. A+"
                    />
                </div>

                {/* Wallet Addresses */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">Solana Wallet Address</label>
                        <input
                            type="text"
                            name="solana_wallet_address"
                            value={formData.solana_wallet_address || ''}
                            onChange={handleChange}
                            className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors font-mono text-sm"
                            placeholder="e.g. B4bAb..."
                        />
                    </div>
                    <div>
                        <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">Ethereum Wallet Address</label>
                        <input
                            type="text"
                            name="ethereum_wallet_address"
                            value={formData.ethereum_wallet_address || ''}
                            onChange={handleChange}
                            className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors font-mono text-sm"
                            placeholder="e.g. 0x123..."
                        />
                    </div>
                </div>

                {/* Incentivized */}
                <div className="flex items-center h-full pt-6">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="incentivized"
                            checked={formData.incentivized}
                            onChange={handleChange}
                            className="w-5 h-5 bg-black border border-white/20 text-gold focus:ring-0 rounded-sm"
                        />
                        <span className="ml-3 text-secondary text-xs font-bold uppercase tracking-widest">Incentivized Earning</span>
                    </label>
                </div>

            </div>

            {/* Description */}
            <div>
                <label className="block text-secondary text-xs font-bold uppercase tracking-widest mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-gold outline-none transition-colors"
                    placeholder="Brief description of the vault strategy..."
                ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    className="px-8 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors"
                >
                    {initialData ? 'Update Vault' : 'Create Vault'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-8 py-3 bg-white/5 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default VaultForm;
