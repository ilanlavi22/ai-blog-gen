import Link from 'next/link'
import { Button } from './ui/button'
import Logo from '@/components/Logo'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className='py-6'>
      <div className='container flex max-w-3xl items-center justify-between'>
        <Link href='/'>
          <Logo />
        </Link>

        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>

        <SignedOut>
          <SignInButton mode='modal'>
            <Button size='sm' variant={'ghost'}>
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  )
}
