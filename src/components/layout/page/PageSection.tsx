import PageTitle from '@/components/ui/typography/PageTitle';

type Props = {
  children?: React.ReactNode;
  title?: string;
  reverseTitle?: boolean;
};

export default function PageSection({ children, title, reverseTitle = false }: Props) {
  return (
    <section
      className={`not-first:border-t-4 border-heading bg-background bg-[url(/transparent-bg/paper-3.png)] bg-repeat bg-size[8.625rem] even:bg-white px-4 py-6 md:p-8`}
    >
      {title && (
        <div
          className={`w-full max-w-fit mx-auto md:mx-0 md:max-w-[66.667%] ${reverseTitle ? 'md:ml-auto md:text-right' : ''}`}
        >
          <PageTitle as="h2" size="lg">
            {title}
          </PageTitle>
        </div>
      )}
      <div className="flex flex-wrap justify-center md:grid md:grid-cols-12 gap-6 pt-6 w-full">
        {children}
      </div>
    </section>
  );
}
