'use client'

import {Inbox} from "lucide-react"
import {useDropzone} from 'react-dropzone'
import { uploadToS3 } from '@/lib/s3'

const FileUpload = () => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles:1,
        onDrop: async (acceptedFiles)=> {
          const file = acceptedFiles[0];
          if(file.size > 10 * 1024 * 1024) {
            alert("File size exceeds 10MB limit");
            return;
          }
          try {
            const data = await uploadToS3(file);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
    });
  return (
    <div className='p-2 bg-white rounded-xl w-full max-w-md h-60'>
      <div  {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer  py-8 h-full flex justify-center items-center flex-col bg-gradient-to-r from-amber-200/10 to-yellow-400/101`",
        })} >
        <input {...getInputProps()} />
        <>
        <Inbox className='size-10 text-blue-500'/>

<p className='text-slate-400 mt-2 text-sm'>Drop PDF here</p>        </>
      </div>
    </div>
  )
}

export default FileUpload