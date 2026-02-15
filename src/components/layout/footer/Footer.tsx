import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="md:mt-20 bg-mainText py-10 px-6">
      <div className="max-w-7xl w-full md:w-[calc(100vw-2.5rem)] mx-auto">
        <Link href="/">
          <Image
            src="/common/logo-white.webp"
            alt="Dungeon Delvers Inc. - Where Adventures Begin"
            width="260"
            height="98"
            loading="lazy"
          />
        </Link>
      </div>
    </footer>
  );
}
