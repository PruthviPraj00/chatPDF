'use client'

import { useState } from 'react'
import { Inbox, Loader2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const FileUpload = () => {
  const [uploading, setUploading] = useState(false)
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string }) => {
      const response = await axios.post('/api/create-chat', {
        file_name,
        file_key
      })
      return response.data
    }
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: async acceptedFiles => {
      const file = acceptedFiles[0]
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit')
        return
      }

      try {
        setUploading(true)
        const data = await uploadToS3(file)
        if (!data.file_key || !data.file_name) {
          toast.error('data not found')
          return
        }
        mutate(data, {
          onSuccess: data => {
            console.log(data)
          },
          onError: err => {
            toast.error('Error Creating Chat')
          }
        })
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        setUploading(false)
      }
    }
  })
  return (
    <div className='h-60 w-full max-w-md rounded-xl bg-white p-2'>
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 rounded-xl cursor-pointer py-8 h-full flex justify-center items-center flex-col bg-gradient-to-r from-amber-200/10 to-yellow-400/10'
        })}
      >
        <input {...getInputProps()} />
        {uploading || isPending ? (
          <>
            <Loader2 className='h-10 text-blue-600' />
            <p className='mt-2 text-sm text-slate-400'>Spilling teat to GPT...</p>
          </>
        ) : (
          <>
            <Inbox className='size-10 text-blue-500' />
            <p className='mt-2 text-sm text-slate-400'>Drop PDF here</p>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUpload
