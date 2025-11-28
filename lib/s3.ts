import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export async function uploadToS3(file: File): Promise<{ file_key: string; file_name: string }> {
  try {
    const s3Client = new S3Client({
      region: process.env.NEXT_PUBLIC_S3_REGION,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED'
    })

    const file_key = 'uploads/' + Date.now().toString() + file.name.replace(' ', '-')

    const fileBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(fileBuffer)

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: buffer,
      ContentType: file.type,
      ChecksumAlgorithm: undefined
    })

    const data = await s3Client.send(command)
    console.log('S3 upload successful:', data)

    return {
      file_key,
      file_name: file.name
    }
  } catch (error) {
    console.error('S3 upload error:', error)
    throw error
  }
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file_key}`

  return url
}
