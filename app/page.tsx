import Link from 'next/link'
import Image from 'next/image'

import { getAllBlogs } from '@/lib/supabase'

import Form from '@/components/Form'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export default async function Home() {
  const blogs = await getAllBlogs()

  return (
    <section className='py-28'>
      <div className='container max-w-5xl'>
        <h1 className='text-3xl font-bold'>Next AI Blogger</h1>
        <Form />

        {/* Blogs */}

        <div className='mt-44'>
          <h2 className='text-xl font-semibold leading-none tracking-tight'>
            Recent blogs
          </h2>
          <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {blogs?.map(blog => (
              <Card key={blog.id} className='overflow-hidden '>
                <CardContent className='p-0'>
                  <Link href={`/blog/${blog.id}`} key={blog.id}>
                    <Image
                      alt={blog.title}
                      src={blog.imageUrl}
                      width={600}
                      height={600}
                      className='w-full'
                    />
                    <div className='px-4 pb-3 pt-2'>
                      <h3 className='font-medium'>{blog.title}</h3>
                      <p className='text-xs text-gray-600'>
                        {formatDate(blog.created_at)}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
