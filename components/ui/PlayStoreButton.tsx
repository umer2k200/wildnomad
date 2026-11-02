import { PLAY_STORE_URL } from '@/lib/config';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function PlayStoreButton({
  className,
  fullWidth = false,
}: {
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex transition-transform duration-fast hover:-translate-y-0.5',
        fullWidth && 'w-full justify-center',
        className,
      )}
    >
      <Image
        src="/badges/google-play-badge.png"
        alt="Get it on Google Play"
        width={646}
        height={250}
        className="h-[92px] w-auto sm:h-[104px]"
      />
    </a>
  );
}
