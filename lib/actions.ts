'use server'

// https://platform.openai.com/docs/guides/text-generation?lang=node.js

//https://supabase.com/docs/reference/javascript/storage-from-upload?example=upload-file

import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'
import { decode } from 'base64-arraybuffer'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function createCompletion(prompt: string) {
  if (!prompt) {
    return { error: 'No prompt provided' }
  }

  const { userId } = auth()
  if (!userId) {
    return { error: 'User is not authenticated' }
  }

  // generate blog post using openai

  // we are using the client to hit the chat completion endpoint and passing an array of messages with the role of user (could be also assistant or an agent). The system is used if we need to give some instruction to the model e.g. gpt-4, and then the user is actually the prompt that the user plugged in and the assistant role would be the response from the model.
  const messages: any = [
    {
      role: 'user',
      content: `Write a blog post around 200 words about the following topic: "${prompt}" in markdown format.`
    }
  ]

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages
  })

  // if we have any completions, and the content inside of it is going to be stored in the content variable and if we don't have any content, we're going to return an error.

  const content = completion?.choices[0]?.message?.content
  if (!content) {
    return { error: 'Unable to generate the blog content' }
  }

  // generate an image using openai

  const image = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `Generate an image for a blog post about "${prompt}"`,
    n: 1, // number of images to generate
    size: '1792x1024',
    quality: 'standard',
    response_format: 'b64_json'
    // base64 encoded image. We can also get the image url by setting the response_format to url but the image url will expire at some point. So, we are going to use the base64 encoded image and store it in the supabase storage.
  })

  const imageName = `blog-${Date.now()}`
  const imageData = image?.data?.[0]?.b64_json as string

  if (!imageData) {
    return { error: 'Unable to generate the blog image' }
  }

  // upload the image to supabase storage

  const { data, error } = await supabase.storage
    .from('blogs')
    .upload(imageName, decode(imageData), {
      // array buffer. decoding a raw image data.
      contentType: 'image/png'
    })

  if (error) {
    return { error: 'Unable to upload the blog image to Storage.' }
  }

  const path = data?.path
  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/blogs/${path}`

  // create a new blog post in supabase

  const { data: blog, error: blogError } = await supabase
    .from('blogs')
    .insert([{ title: prompt, content, imageUrl, userId }])
    .select() // the 'select' returns the blog post that we just inserted.

  if (blogError) {
    return { error: 'Unable to insert the blog data into the database' }
  }

  const blogId = blog?.[0]?.id // the blog id is going to be the first blog post that we just inserted.

  revalidatePath('/')
  redirect(`/blog/${blogId}`)
}
