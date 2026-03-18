'use client';
import CTALink from '@/components/ui/links/CTALink';
import PageText from '@/components/ui/typography/PageText';
import PageTitle from '@/components/ui/typography/PageTitle';

type Props = {
  ctaText: string;
  hasReturn?: boolean;
};

export default function NoMapFound({ ctaText, hasReturn }: Props) {
  return (
    <main className="bg-background h-dvh w-full flex flex-col items-center justify-center gap-6">
      <PageTitle as="h1" size="md">
        Map Not Found
      </PageTitle>
      <PageText customClasses="text-center font-medium text-lg">
        Either the map you are looking for does not exist or you do not have permission to view it.
      </PageText>
      <div className="flex flex-col md:flex-row gap-4">
        {hasReturn && (
          <CTALink
            link={`${window.location.href.replace('/map', '')}`}
            text={ctaText}
            type="primary"
          />
        )}
        <CTALink link="/" text="Return to Home Page" type="secondary" />
      </div>
    </main>
  );
}
