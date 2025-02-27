import { useState } from "react";
import CloudinaryUploader from "./CloudinaryUploader";

interface Product {
    name: string;
    price: string;
    description: string;
    images: string[];
}

interface ProductFormProps {
    onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const addImageUrl = (url: string) => {
        setImages([...images, url]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const product = { name, price, description, images };
        onAddProduct(product);
        // Reset form fields after adding product
        setName("");
        setPrice("");
        setDescription("");
        setImages([]);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-lg my-4">
            <h3 className="text-lg font-bold mb-2">Add Product</h3>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded-md my-2"
            />
            <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border p-2 rounded-md my-2"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded-md my-2"
            />
            <div>
                <p className="font-semibold">Upload Product Images</p>
                <CloudinaryUploader onUpload={addImageUrl} />
                {images.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm">Uploaded Images:</p>
                        <div className="flex space-x-2">
                            {images.map((img, index) => (
                                <img key={index} src={img} alt={`Product ${index}`} className="w-16 h-16 object-cover" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                Add Product
            </button>
        </form>
    );
};

export default ProductForm;
