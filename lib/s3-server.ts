import { S3 } from '@aws-sdk/client-s3'
import fs from 'fs'
import { Readable } from 'stream'
export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID
    const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
    const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME

    if (!accessKeyId || !secretAccessKey || !bucketName) {
      reject(new Error('Missing required S3 environment variables'))
      return
    }

    const s3 = new S3({
      region: process.env.NEXT_PUBLIC_S3_REGION,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    })
    const params = {
      Bucket: bucketName,
      Key: file_key
    }

    s3.getObject(params)
      .then(obj => {
        const file_name = `/tmp/elliott${Date.now().toString()}.pdf`

        if (obj.Body instanceof Readable) {
          const file = fs.createWriteStream(file_name)
          file.on('open', () => {
            ;(obj.Body as Readable).pipe(file).on('finish', () => {
              return resolve(file_name)
            })
          })
        }
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}
