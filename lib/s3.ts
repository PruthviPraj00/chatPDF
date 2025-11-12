import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";


export async function uploadToS3(file: File) {
    try {
        const s3Client = new S3Client({
            region: process.env.NEXT_PUBLIC_AWS_REGION || '',
            credentials: {
                accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || ''
            }
        });

        // Generate unique file key with timestamp
        const file_key = "uploads/" + Date.now().toString() + file.name.replace(/ /g, '-');

        // Convert File to Buffer for upload
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
            Key: file_key,
            Body: fileBuffer,
            ContentType: file.type, // Add content type for proper file handling
        };
        
        await s3Client.send(
            new PutObjectCommand(params)
        );
        
        console.log("Successfully uploaded to S3:", file_key);

        return {
            file_key,
            file_name: file.name
        };

    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw new Error(`Failed to upload file to S3: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export function getS3Url(file_key: string) {
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file_key}`

    return url
}