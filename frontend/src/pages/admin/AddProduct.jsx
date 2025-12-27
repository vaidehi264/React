import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productServices";

const AddProduct = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        category: "", // Map to 'genre' in backend if needed, checking backend model
        image: "",
        genre: "Electronics" // Default or select
    });
    const [loading, setLoading] = useState(false);

    // Looking at backend Product model: title, image, price, description, genre
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createProduct(form);
            navigate("/admin/dashboard");
        } catch (err) {
            alert("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    // Handle JSON File Import
    const handleJsonUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target.result);
                // Validate/Map fields if necessary
                setForm((prev) => ({
                    ...prev,
                    title: json.title || prev.title,
                    price: json.price || prev.price,
                    description: json.description || prev.description,
                    image: json.image || prev.image,
                    genre: json.genre || prev.genre,
                }));
                alert("Data autofilled from JSON!");
            } catch (error) {
                console.error("Invalid JSON", error);
                alert("Failed to parse JSON file. Please ensure it is valid.");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

            {/* JSON IMPORT BUTTON */}
            <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-blue-900">Autofill with JSON</h3>
                    <p className="text-sm text-blue-700">Upload a .json file to populate fields.</p>
                </div>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
                    Choose File
                    <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleJsonUpload}
                    />
                </label>
            </div>

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
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
