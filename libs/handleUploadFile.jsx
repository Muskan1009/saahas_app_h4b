import { getItemAsync } from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer'; // Ensure you have buffer polyfill installed


const handleUploadFile = async (file) => {

    const token = await getItemAsync('token');

    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    // Convert to buffer
    const fileBuffer = Buffer.from(base64, 'base64');

    console.log("File buffer size:", typeof fileBuffer);

    // Get the file name (fallback to "upload.jpg" if not found)
    const fileName = file.name || `upload_${Date.now()}.jpg`;

    try {
        // Fetch signed URL from your backend
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}aws/s3/sign-url?key=${encodeURIComponent(fileName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `Authorization ${token}`,
            },
        });

        const { signedRequestUrl } = await response.json();

        console.log("Received signed URL:", signedRequestUrl.split('?')[0]);

        // Upload file to S3 using signed URL
        await fetch(signedRequestUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: fileBuffer,
        }).then(() => {
        })

        return signedRequestUrl.split('?')[0]; // Return the URL without query parameters

    } catch (error) {
        console.error("Error", error);
        return null; // Return null if there's an error
    }

};

export default handleUploadFile;