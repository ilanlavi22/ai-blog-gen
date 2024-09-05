import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
  children: string
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className='space-y-3'
      components={{
        h2: props => <h2 className='text-2xl font-bold' {...props} />,
        p: props => <p className='py-2 text-sm leading-6' {...props} />,
        ul: props => <ul className='list-inside list-disc' {...props} />,
        a: props => (
          <a className='text-green-500 underline' target='_blank' {...props} />
        ),
        strong: props => <strong className='font-semibold' {...props} />
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
