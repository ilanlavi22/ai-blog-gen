'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createCompletion } from '@/lib/actions'
import SubmitButton from './SubmitButton'

export default function Form() {
  async function action(formData: FormData) {
    const prompt = formData.get('prompt')
    // if (!prompt) {
    //   // show toast notification
    //   toast.error('Prompt is required')
    //   return
    // }
    // call server action
    const result = await createCompletion(prompt as string)
    if (result?.error) {
      // show toast notification
      toast.error(result.error)
    }
  }

  return (
    <section className='mx-auto max-w-lg'>
      <Card className='border-0 shadow-none'>
        <CardHeader className='text-center'>
          <CardTitle>Next AI Blogger</CardTitle>
          <CardDescription>Generate a blog post about anything</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className='mt-3'>
            <Input
              name='prompt'
              placeholder='What should I write about?'
              className='rounded-lg'
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
