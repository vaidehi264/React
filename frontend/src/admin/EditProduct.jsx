import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { Save, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getSingleProduct, updateProduct } from '../services/productServices';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        genre: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getSingleProduct(id);
                const product = res.data;
                setFormData({
                    title: product.title || '',
                    price: product.price || '',
                    genre: product.genre || '',
                    description: product.description || '',
                    image: product.image || ''
                });
            } catch (error) {
                toast.error('Failed to fetch product details');
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, formData);
            toast.success('Product updated successfully!');
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update product');
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Edit Product Details</h1>
                    <p className="text-gray-500 text-lg">Update information for <span className="text-primary font-bold">{formData.title}</span></p>
                </header>

                <div className="bg-white p-10 rounded-[2rem] shadow-sm max-w-4xl">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Product Title</label>
                            <input
                                type="text" name="title" value={formData.title}
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                required onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Price (₹)</label>
                            <input
                                type="number" name="price" value={formData.price}
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                required onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Category / Genre</label>
                            <select
                                name="genre" value={formData.genre}
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer"
                                onChange={handleChange} required
                            >
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
                                type="text" name="image" value={formData.image}
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                required onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Description</label>
                            <textarea
                                name="description" rows="4" value={formData.description}
                                className="p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                required onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full h-[60px] btn-primary flex items-center justify-center gap-3 text-lg"
                            >
                                <Save size={22} />
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditProduct;
