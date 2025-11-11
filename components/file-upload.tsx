'use client'

import React from 'react'
import {Inbox} from "lucide-react"
import {useDropzone} from 'react-dropzone'

const FileUpload = () => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles:1,
        onDrop: (acceptedFiles)=> {
          
        }
    });
  return (
    <div className='p-2 bg-white rounded-xl w-full max-w-md h-60'>
      <div  {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 h-full flex justify-center items-center flex-col",
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