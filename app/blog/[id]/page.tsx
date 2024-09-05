import { getBlogById } from '@/lib/supabase'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Markdown from '@/components/Markdown'

export default async function Blog({ params }: { params: { id: string } }) {
  const { content, imageUrl, title } = await getBlogById(Number(params.id))

  return (
    <section className='py-12'>
      <div className='container max-w-3xl'>
        <Link
          href='/'
          className='-ml-2 inline-flex items-center text-sm font-light text-gray-500 no-underline hover:text-gray-700'
        >
          <ChevronLeft strokeWidth={1} size={20} />
          <span>Go back</span>
        </Link>

        <section className='prose mt-6 max-w-none'>
          <Image alt={title} src={imageUrl} width={1972} height={1024} />
          <Markdown>{content}</Markdown>
        </section>
      </div>
    </section>
  )
}
