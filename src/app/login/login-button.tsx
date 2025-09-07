'use client'

import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

const LoginButton = () => {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const pathname = searchParams.get('redirect') ?? '/'

  return (
    <Button
      onClick={async () => {
        setLoading(true)
        await signIn('google', {
          redirect: true,
          callbackUrl: pathname
        })
      }}
      variant='outline'
      className='mx-auto mt-8'
      disabled={loading}
    >
      {loading && <Loader2Icon className='mr-2.5 size-4 animate-spin' />}
      {!loading && <Image src='/google.svg' width={16} height={16} alt='Google' className='mr-2' />}
      Continue with Google
    </Button>
  )
}

export default LoginButton
