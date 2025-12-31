import PageTitle from '@/components/ui/typography/PageTitle'

type Props = {
  children?: React.ReactNode
  title?: string
  reverseTitle?: boolean
}

export default function PageSection({ children, title, reverseTitle = false }: Props) {
  return (
    <section
      className={`not-first:border-t-4 border-heading bg-background bg-[url(/transparent-bg/paper-3.png)] bg-repeat bg-size[8.625rem] even:bg-white grid grid-cols-12 gap-6 p-8`}
    >
      {title && (
        <div
          className={`col-span-12 w-full max-w-[66.667%] ${reverseTitle ? 'ml-auto text-right' : ''}`}
        >
          <PageTitle as="h2" size="lg">
            {title}
          </PageTitle>
        </div>
      )}
      {children}
    </section>
  )
}
