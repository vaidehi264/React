import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllProducts, deleteProduct } from '../services/productServices';

const AdminInventory = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data || []);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch inventory');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.genre?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 lg:p-12">
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Product Inventory</h1>
                        <p className="text-gray-500 text-lg">Manage your stock and availability</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/add-product')}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/30 transition-all"
                    >
                        <Plus size={20} />
                        Add New Product
                    </button>
                </header>

                <div className="bg-white px-6 py-4 rounded-2xl shadow-sm flex items-center gap-4 mb-8">
                    <Search size={20} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or brand..."
                        className="flex-1 outline-none text-gray-700 bg-transparent py-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image</th>
                                <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title</th>
                                <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Genre/Category</th>
                                <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                                <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status / Booked By</th>
                                <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-5 px-6">
                                        <img src={product.image} alt={product.title} className="w-16 h-10 object-cover rounded-lg shadow-sm" />
                                    </td>
                                    <td className="p-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-tight">{product.title}</td>
                                    <td className="p-5 px-6 text-sm text-gray-600">{product.genre}</td>
                                    <td className="p-5 px-6 text-sm font-black text-gray-900">₹{product.price.toLocaleString()}</td>
                                    <td className="p-5 px-6">
                                        {product.isBooked ? (
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase text-red-500 bg-red-50 px-2 py-1 rounded-full w-fit mb-1">Booked</span>
                                                <span className="text-xs font-bold text-gray-700">{product.bookedBy?.name || 'Customer'}</span>
                                                <span className="text-[10px] text-gray-400">{product.bookedBy?.email}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-black uppercase text-green-500 bg-green-50 px-2 py-1 rounded-full">Available</span>
                                        )}
                                    </td>
                                    <td className="p-5 px-6">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-16 text-center text-gray-400 font-medium italic">No products found matching your search</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminInventory;
