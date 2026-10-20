"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { QuoteForm } from "./QuoteForm";

/** Floating chat-style button (desktop) that opens the quote form in a native <dialog>. */
export function FloatingQuote() {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => setMounted(false);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  function open() {
    setMounted(true);
    ref.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="bg-gradient-accent fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-2 rounded-full px-5 font-semibold text-night shadow-xl shadow-cyan/30 transition hover:brightness-110 lg:inline-flex"
        aria-haspopup="dialog"
      >
        <MessageSquare className="h-5 w-5" aria-hidden="true" /> Free Quote
      </button>
      <dialog
        ref={ref}
        aria-labelledby="quote-modal-title"
        className="m-auto w-[min(36rem,calc(100%-2rem))] rounded-2xl border border-line bg-panel p-0 text-slate-200 backdrop:bg-black/70"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
      >
        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p id="quote-modal-title" className="font-heading text-2xl font-semibold text-white">Get Your Free Quote</p>
              <p className="mt-1 text-sm text-slate-400">A local designer will reach out to plan your lighting.</p>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line">
              <X className="h-5 w-5" />
            </button>
          </div>
          {mounted && <QuoteForm variant="compact" idPrefix="modal" />}
        </div>
      </dialog>
    </>
  );
}
