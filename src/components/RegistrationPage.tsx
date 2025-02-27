"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    companyName: yup.string().required("Company Name is required"),
    description: yup.string().required("Description is required"),
    logo: yup.mixed().required("Company Logo is required"),
    products: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Product name is required"),
            price: yup.number().positive().required("Product price is required"),
            description: yup.string().required("Product description is required"),
            images: yup.array().min(1, "At least one product image is required"),
        })
    ),
});

const RegistrationPage = () => {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [products, setProducts] = useState([{ name: "", price: "", description: "", images: [] }]);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
        alert("Registration Successful!");
    };

    const addProduct = () => {
        setProducts([...products, { name: "", price: "", description: "", images: [] }]);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="max-w-3xl mx-auto p-8 bg-gray-800 shadow-lg rounded-xl">
                <h2 className="text-3xl font-bold text-white mb-6">Company Registration</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-white">Company Name</label>
                        <input type="text" {...register("companyName")} className="w-full bg-gray-700 text-white rounded-lg p-2" />
                        {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-white">Description</label>
                        <textarea {...register("description")} className="w-full bg-gray-700 text-white rounded-lg p-2" />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label className="block text-white">Company Logo</label>
                        <input type="file" accept="image/*" {...register("logo")} onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setValue("logo", file);
                                setLogoPreview(URL.createObjectURL(file));
                            }
                        }} className="w-full bg-gray-700 text-white p-2 rounded-lg" />
                        {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 h-20 rounded" />}
                        {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-white">Add Products</h3>
                        {products.map((product, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg mt-3">
                                <input type="text" placeholder="Product Name" {...register(`products[${index}].name`)} className="w-full bg-gray-600 text-white p-2 rounded-lg mb-2" />
                                <input type="number" placeholder="Price" {...register(`products[${index}].price`)} className="w-full bg-gray-600 text-white p-2 rounded-lg mb-2" />
                                <textarea placeholder="Description" {...register(`products[${index}].description`)} className="w-full bg-gray-600 text-white p-2 rounded-lg" />
                                <label className="block text-white mt-2">Product Images</label>
                                <input type="file" accept="image/*" multiple {...register(`products[${index}].images`)} className="w-full bg-gray-600 text-white p-2 rounded-lg" />
                            </div>
                        ))}
                        <button type="button" onClick={addProduct} className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3">Add Another Product</button>
                    </div>

                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;