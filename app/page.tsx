import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'
import FileUpload from '@/components/FileUpload'

export default async function Home() {
  const user = await currentUser()
  const isAuth = !!user

  return (
    <div className='bg-linear-to-b from-gray-900 via-purple-900 to-violet-600'>
      <div className='mx-auto flex h-full min-h-screen max-w-7xl flex-col items-center justify-center gap-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex items-start gap-4'>
          <div className='text-center'>
            <h1 className='mb-8 text-4xl font-bold text-white'>Welcome to ChatPDF</h1>
            <p className='mb-4 text-lg text-white'>Your AI-powered PDF assistant.</p>
          </div>
          <div className='mt-1'>
            <UserButton />
          </div>
        </div>
        <div className='mt-2 flex gap-3'>
          {isAuth ? (
            <Button asChild>
              <Link href='/sign-in'>
                login In to Continue
                <LogInIcon className='size-4' />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href='/chats'>
                Go to chats
                <LogInIcon className='size-4' />
              </Link>
            </Button>
          )}
        </div>
        <p className='mt-4 max-w-xl text-center text-lg text-slate-100'>
          Join millions of students, researchers and professionals to instantly answer questions and understand research
          with AI
        </p>
        <div className='mt-4 flex w-full items-center justify-center'>
          {isAuth ? (
            <FileUpload />
          ) : (
            <Button asChild>
              <Link href='/sign-in/'>
                login In to Continue
                <LogInIcon className='size-4' />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
