import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <>
      <SignedIn>
        <Button
          type='submit'
          size='sm'
          className={cn('mt-3 w-full rounded-lg', pending && 'animate-pulse')}
        >
          {pending ? 'Working on it...' : 'Submit'}
        </Button>
      </SignedIn>

      <SignedOut>
        <SignInButton mode='modal'>
          <Button
            size='sm'
            type='button'
            variant={'secondary'}
            className='mt-3 w-full rounded-lg'
          >
            Sign in to start
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  )
}
