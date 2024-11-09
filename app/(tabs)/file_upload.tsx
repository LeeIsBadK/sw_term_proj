import React, { useState } from 'react';

const PhotoUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

  // Handle file change event
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
    }
};

  // Handle form submission
const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!file) {
        alert('Please choose a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
        const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
        });

        if (response.ok) {
        alert('File uploaded successfully');
        } else {
        alert('Error uploading the file');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error uploading the file');
    }
};
return (
    <div>
        <h2>Upload Your Photo</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="photo">Choose a photo to upload:</label>
                    <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    />
                <br />
            <button type="submit">Upload Photo</button>
        </form>
    </div>
);

};

export default PhotoUpload;
