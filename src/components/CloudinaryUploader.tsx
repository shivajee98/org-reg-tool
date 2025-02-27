"use client";
import { useState } from "react";

interface CloudinaryUploaderProps {
    onUpload: (url: string) => void;
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({ onUpload }) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!image) return alert("Select an image first!");
        setUploading(true);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            if (data.secure_url) {
                setUploadedUrl(data.secure_url);
                onUpload(data.secure_url);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <input type="file" onChange={handleFileChange} className="border p-2 rounded-md w-full" />
            {preview && <img src={preview} alt="Preview" width={100} />}
            <button onClick={handleUpload} disabled={uploading} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {uploading ? "Uploading..." : "Upload to Cloudinary"}
            </button>
            {uploadedUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={uploadedUrl} alt="Uploaded" width={150} />
                </div>
            )}
        </div>
    );
};

export default CloudinaryUploader;
