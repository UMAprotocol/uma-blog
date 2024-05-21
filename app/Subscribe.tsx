"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useStatus } from "@/hooks/useStatus";
import { addSubscriber } from "@/lib/mailchimp";
import { cn, sleep } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Subscribe({ className }: Props) {
  const [status, setStatus] = useStatus();

  async function handleSubmit(data: FormData) {
    try {
      setStatus("PENDING");
      await sleep(1000);
      await addSubscriber(data);
      setStatus("SUCCESS");
    } catch (e) {
      console.log(e);
      setStatus("FAIL");
      await sleep(2000);
      setStatus("IDLE");
    }
  }

  return (
    <div
      className={cn(
        " flex flex-col items-center justify-evenly p-4 text-center card",
        className,
      )}
    >
      <p className="text-md text-text-secondary">
        Get UMA updates straight to your inbox
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn("text-accent text-md", className)}
            variant="ghost"
          >
            Subscribe Now
          </Button>
        </DialogTrigger>
        {status === "SUCCESS" ? (
          <DialogContent className="sm:max-w-[300px]">
            <DialogHeader>
              <DialogTitle>You&apos;re on the list!</DialogTitle>
            </DialogHeader>
            <DialogClose asChild>
              <Button className="mx-auto" variant="filled">
                Back to Blog
              </Button>
            </DialogClose>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-[425px] lg:max-w-[520px]">
            <DialogHeader>
              <DialogTitle>Get UMA updates straight to your inbox</DialogTitle>
              <DialogDescription>
                Never miss an important issue or a vote again by subscribing to
                the official UMA newsletter.
              </DialogDescription>
            </DialogHeader>

            <form action={(data) => void handleSubmit(data)}>
              <DialogFooter>
                <Input
                  name="subscriberEmail"
                  placeholder="example@email.com"
                  type="email"
                />
                <Button
                  disabled={status !== "IDLE"}
                  type="submit"
                  variant="filled"
                >
                  {status === "PENDING" && <>Subscribing...</>}
                  {status === "IDLE" && <>Save changes</>}
                  {status === "FAIL" && <>Failed</>}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
