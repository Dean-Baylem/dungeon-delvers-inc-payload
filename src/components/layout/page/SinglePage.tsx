import BlockGroup from '@/components/blocks/group/BlockGroup';
import InfoBox from '@/components/blocks/infobox/Infobox';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import Hero from '@/components/ui/hero/Hero';
import CTALink from '@/components/ui/links/CTALink';
import { RichText } from '@/components/ui/RichText';
import { gridOptions } from '@/lib/options/gridOptions';
import { SinglePageType } from '@/types/singlePage/singlePage';

export default function SinglePage(props: SinglePageType) {
  const {
    title,
    lead,
    subtitle = 'Session Details',
    content,
    infobox,
    heroChildren,
    children,
  } = props;

  return (
    <main>
      <Hero
        variant="half"
        title={title}
        lead={lead}
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      >
        {heroChildren}
      </Hero>
      <PageContents>
        <PageSection title={`${content ? subtitle : 'No Recorded Content'}`}>
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[11] },
              start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
              row: { tab: gridOptions.row.tab[0], pc: gridOptions.row.pc[0] },
              rowSpan: { tab: gridOptions.rowSpan.tab[1], pc: gridOptions.rowSpan.pc[1] },
            }}
          >
            {content ? (
              <div className={`${infobox ? 'hasInfobox' : ''}`}>
                {infobox && (
                  <div className="sm:float-right w-fit sm:ml-4 mb-6 sm:mb-4">
                    <InfoBox groups={infobox}></InfoBox>
                  </div>
                )}
                <RichText data={content} />
                <hr className="border-0 h-0.5 bg-heading mt-8 w-full" />
              </div>
            ) : (
              <p className="font-medium font-serif text-center text-lg">
                Currently the records for this session are being finalised.
                <br />
                Please check back later.
              </p>
            )}
            <div className="grid text-center sm:flex sm:flex-col items-center justify-center gap-4 sm:gap-6 mt-4 mb-4 sm:mb-0">
              <CTALink link={'/sessions'} type="secondary" text="Sessions Archive"></CTALink>
              <CTALink link={'/'} type="primary" text="Home Page"></CTALink>
            </div>
          </BlockGroup>
        </PageSection>
        {children}
      </PageContents>
    </main>
  );
}
