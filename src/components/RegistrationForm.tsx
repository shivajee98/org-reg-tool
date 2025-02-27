"use client"


import { useState } from "react";
import CloudinaryUploader from "./CloudinaryUploader";
import ProductForm from "./ProductForm";
import { supabase } from "../services/supabase";

interface Product {
    name: string;
    price: string;
    description: string;
    images: string[];
}

const RegistrationForm: React.FC = () => {
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = (product: Product) => {
        setProducts([...products, product]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from("companies").insert([
                {
                    company_name: companyName,
                    description,
                    logo: logoUrl,
                    products: products, // Assumes a JSON or text column to store products
                },
            ]);
            if (error) throw error;
            alert("Registration successful!");
        } catch (error: any) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold">Company Registration</h2>
            <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border p-2 rounded-md"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded-md"
            />
            <div>
                <p className="font-semibold">Upload Company Logo</p>
                <CloudinaryUploader onUpload={setLogoUrl} />
            </div>
            <div>
                <h3 className="text-lg font-bold">Products</h3>
                <ProductForm onAddProduct={addProduct} />
                {products.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-semibold">Added Products:</h4>
                        <ul>
                            {products.map((product, index) => (
                                <li key={index} className="border p-2 my-2">
                                    <p><strong>Name:</strong> {product.name}</p>
                                    <p><strong>Price:</strong> {product.price}</p>
                                    <p><strong>Description:</strong> {product.description}</p>
                                    <div className="flex space-x-2">
                                        {product.images.map((img, idx) => (
                                            <img key={idx} src={img} alt={`Product ${idx}`} className="w-16 h-16 object-cover" />
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                Submit Registration
            </button>
        </form>
    );
};

export default RegistrationForm;
