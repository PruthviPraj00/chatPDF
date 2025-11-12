

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from 'next/link'
import {LogInIcon} from 'lucide-react'
import FileUpload from "@/components/file-upload";

export default async function Home() {
  const user = await currentUser()
  const isAuth = !!user


  return (
    <div className="w-screen min-h-screen bg-linear-to-b  from-gray-900 via-purple-900 to-violet-600 mx-auto flex h-full max-w-7xl items-center justify-center gap-6 px-4 sm:px-6 lg:px-8 flex-col">
      <div className="flex gap-2 items-start">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Welcome to ChatPDF</h1>
          <p className="text-lg text-white mb-4">
            Your AI-powered PDF assistant.
          </p>
        </div>
        <div className="mt-6">
          <UserButton />
        </div>
      </div>

      <div 
      className="mt-2 flex gap-3">
        {isAuth ? (
          <Button asChild >
                <Link href="/sign-in">login In to Continue 
                <LogInIcon className="size-4" />
                </Link>
              </Button>
        ) : (
          <Button asChild >
                <Link href="/chats">Go to chats
                <LogInIcon className="size-4" />
                </Link>
              </Button>
        )}
      </div>

     <p className="max-w-xl mt-4 text-lg text-slate-100 text-center">
            Join millions of students, researchers and professionals to instantly
            answer questions and understand research with AI
          </p>

          <div className="w-full mt-4 flex items-center justify-center">
            {isAuth ? (
             <FileUpload />
            ) : (
              <Button asChild >
                <Link href="/sign-in/">login In to Continue 
                <LogInIcon className="size-4" />
                </Link>
              </Button>
            )}
          </div>
      
    </div>
  );
}
