import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Save, ArrowLeft, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createProduct, bulkCreateProducts } from '../services/productServices';

const AddProduct = () => {
    const navigate = useNavigate();
    const [jsonFile, setJsonFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        genre: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            toast.success('Product added successfully!');
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add product');
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                setJsonFile(jsonData);
            } catch (error) {
                toast.error('Invalid JSON file');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const confirmUpload = async () => {
        if (!jsonFile) return;
        try {
            await bulkCreateProducts(jsonFile);
            toast.success('Products imported successfully!');
            setJsonFile(null);
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to import products');
            setJsonFile(null);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 lg:p-12">
                <header className="mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4 font-medium"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Add New Product</h1>
                    <p className="text-gray-500 text-lg">Enter details to add a new electronic accessory to the store</p>
                </header>

                <div className="bg-white p-10 rounded-[2rem] shadow-sm max-w-4xl">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Product Title</label>
                            <input
                                type="text" name="title" placeholder="e.g. Sony WH-1000XM5"
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                required onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Price (₹)</label>
                            <input
                                type="number" name="price" placeholder="e.g. 29999"
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                required onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Category / Genre</label>
                            <select
                                name="genre"
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer"
                                onChange={handleChange} required
                            >
                                <option value="">Select Category</option>
                                <option value="Headphones">Headphones</option>
                                <option value="Earbuds">Earbuds</option>
                                <option value="Speakers">Speakers</option>
                                <option value="Keyboards">Keyboards</option>
                                <option value="Mice">Mice</option>
                                <option value="Smart Watches">Smart Watches</option>
                                <option value="Chargers">Chargers</option>
                                <option value="Computer Accessories">Computer Accessories</option>
                                <option value="Mobile Accessories">Mobile Accessories</option>
                                <option value="Smart Gadgets">Smart Gadgets</option>
                                <option value="Gaming Accessories">Gaming Accessories</option>
                                <option value="Home Electronics">Home Electronics</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Image URL</label>
                            <input
                                type="text" name="image" placeholder="https://example.com/image.jpg"
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                required onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Description</label>
                            <textarea
                                name="description" rows="4" placeholder="Enter detailed description..."
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                required onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2 mt-4">
                            <button
                                type="submit"
                                className="w-full h-[60px] btn-primary flex items-center justify-center gap-3 text-lg"
                            >
                                <Save size={22} />
                                Save Product
                            </button>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="json-upload"
                                />
                                <label
                                    htmlFor="json-upload"
                                    className="w-full h-[60px] btn-secondary flex items-center justify-center gap-3 cursor-pointer text-lg border-dashed"
                                >
                                    <Upload size={22} />
                                    Upload JSON
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {jsonFile && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all scale-100">
                        <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Import Products?</h3>
                        <p className="text-gray-500 mb-8">
                            You are about to add <span className="font-bold text-gray-900">{Array.isArray(jsonFile) ? jsonFile.length : 1}</span> new products to your inventory.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setJsonFile(null)}
                                className="flex-1 btn-danger"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmUpload}
                                className="flex-1 btn-primary"
                            >
                                Yes, Import
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
