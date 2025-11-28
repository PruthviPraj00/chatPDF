import { Pinecone } from '@pinecone-database/pinecone'
import { downloadFromS3 } from './s3-server'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
})

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. Obtain the pdf > download and read it
  console.log('Downloading from S3:', fileKey)
  const file_name = await downloadFromS3(fileKey)
  if (!file_name) {
    throw new Error('could not download from s3')
  }
  console.log('Loading PDF:', file_name)
  const loader = new PDFLoader(file_name)
  const pages = await loader.load()
  return pages
}
