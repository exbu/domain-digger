'use client';

import { useLocalStorage } from '@uidotdev/usehooks';
import { XIcon } from 'lucide-react';
import ms from 'ms';
import { type FC, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useAnalytics } from '@/lib/analytics';

const INITIAL_DELAY = ms('10m');
const TIMEOUT_PERIOD = ms('7d');

export const FeedbackPrompt: FC = () => {
  const { reportEvent } = useAnalytics();

  const [lastDismissed, setLastDismissed] = useLocalStorage(
    'feedback-prompt.last-dismissed',
    Date.now() - TIMEOUT_PERIOD + INITIAL_DELAY,
  );
  const visible = Date.now() - lastDismissed > TIMEOUT_PERIOD;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDismiss = useCallback(() => {
    setLastDismissed(Date.now());
  }, [setLastDismissed]);

  const handleNegative = useCallback(() => {
    window.open('https://wotschofsky.com/#contact', '_blank');
    handleDismiss();
    reportEvent('Feedback: Negative', {});
  }, [handleDismiss, reportEvent]);

  const handleNeutral = useCallback(() => {
    handleDismiss();
    reportEvent('Feedback: Neutral', {});
  }, [handleDismiss, reportEvent]);

  const handlePositive = useCallback(() => {
    setDialogOpen(true);
    handleDismiss();
    reportEvent('Feedback: Positive', {});
  }, [setDialogOpen, handleDismiss, reportEvent]);

  return (
    <>
      {visible && (
        <aside className="fixed bottom-6 right-6 max-w-[calc(100vw-3rem)]">
          <Card className="relative p-8 shadow-lg">
            <XIcon
              role="button"
              onClick={handleDismiss}
              className="absolute !left-[unset] !top-2 right-2 h-5 w-5 text-zinc-500 dark:text-zinc-400"
            />

            <p className="!pl-0 font-semibold">
              How do you feel about Domain Digger?
            </p>
            <div className="mt-1 flex select-none justify-evenly !pl-0">
              <span
                className="block cursor-pointer p-2 text-4xl"
                role="button"
                onClick={handleNegative}
              >
                😢
              </span>
              <span
                className="block cursor-pointer p-2 text-4xl"
                role="button"
                onClick={handleNeutral}
              >
                😐
              </span>
              <span
                className="block cursor-pointer p-2 text-4xl"
                role="button"
                onClick={handlePositive}
              >
                😍
              </span>
            </div>
          </Card>
        </aside>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thanks for your feedback!</DialogTitle>
            <DialogDescription className="space-y-2">
              <p>
                Domain Digger is on a mission to offer the best multi-tool for
                anything domain-related. All 100% free, open-source and without
                ads.
              </p>
              <p>
                As you seem to enjoy using Domain Digger, please consider
                supporting us!
              </p>

              <div className="!mt-4 grid grid-cols-2 gap-4">
                <Button variant="ghost" className="font-semibold" asChild>
                  <a
                    href="https://github.com/sponsors/wotschofsky"
                    target="_blank"
                  >
                    ❤️ Sponsor
                  </a>
                </Button>
                <Button variant="ghost" className="font-semibold" asChild>
                  <a
                    href="https://x.com/intent/post?text=Check%20this%20out!&url=https%3A%2F%2Fdigger.tools"
                    target="_blank"
                  >
                    🐦 Tweet
                  </a>
                </Button>
                <Button variant="ghost" className="font-semibold" asChild>
                  <a
                    href="https://buymeacoffee.com/wotschofsky"
                    target="_blank"
                  >
                    ☕️ Buy a Coffee
                  </a>
                </Button>
                <Button variant="ghost" className="font-semibold" asChild>
                  <a
                    href="https://github.com/wotschofsky/domain-digger"
                    target="_blank"
                  >
                    ⭐️ Star
                  </a>
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
