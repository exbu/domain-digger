import Link from 'next/link';
import type { FC, HTMLAttributes } from 'react';
import { FaGithub, FaHeart } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

import PoweredByVercel from '@/assets/powered-by-vercel.svg';
import { cn } from '@/lib/utils';

import { Logo } from './logo';

type VercelBadgeProps = HTMLAttributes<HTMLAnchorElement>;

const VercelBadge: FC<VercelBadgeProps> = ({ className, ...props }) => (
  <a
    className={cn('[&>svg]:h-10', className)}
    href="https://vercel.com/?utm_source=domain-digger&utm_campaign=oss"
    target="_blank"
    rel="noopener"
    {...props}
  >
    <PoweredByVercel />
    <span className="sr-only">Powered by Vercel</span>
  </a>
);

export const Footer: FC = () => (
  <footer className="w-full p-4 md:px-8">
    <div className="flex flex-col items-start gap-6 border-t pt-4">
      <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
        <Logo />

        <p className="text-sm">
          Created with{' '}
          <FaHeart className="inline text-red-500" fontSize="1.25rem" />
          <span className="sr-only">love</span> by{' '}
          <a
            className="underline decoration-dotted underline-offset-4"
            href="https://wotschofsky.com"
            target="_blank"
            rel="noopener"
            aria-label="Felix Wotschofsky (Site Creator)"
          >
            Felix Wotschofsky
          </a>
        </p>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="mb-1 font-semibold">Free Tools</h2>
            <div className="space-y-1 text-sm underline decoration-dotted underline-offset-4 [&>*]:block">
              <Link href="/">DNS Lookup</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="ghost" asChild>
            <a
              href="https://github.com/wotschofsky/domain-digger"
              target="_blank"
              rel="noopener"
            >
              <FaGithub className="mr-1 h-6 w-6" />
              <span>Source on GitHub</span>
            </a>
          </Button>
          <VercelBadge />
        </div>
      </div>
    </div>
  </footer>
);
