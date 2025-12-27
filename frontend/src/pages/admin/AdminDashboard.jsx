import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../services/productServices";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to load products", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                setProducts(products.filter((p) => p._id !== id));
            } catch (err) {
                alert("Failed to delete product");
            }
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <Link
                    to="/admin/add-product"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-600">Image</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Title</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {product.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">${product.price}</td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <Link
                                            to={`/admin/edit-product/${product._id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FaEdit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
