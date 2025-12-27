import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct, updateProduct } from "../../services/productServices";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        genre: ""
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await getSingleProduct(id);
            setForm(res.data);
        } catch (err) {
            alert("Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await updateProduct(id, form);
            navigate("/admin/dashboard");
        } catch (err) {
            alert("Failed to update product");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        required
                        placeholder="https://..."
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Category (Genre)
                    </label>
                    <select
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home</option>
                        <option value="Books">Books</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    {submitting ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
