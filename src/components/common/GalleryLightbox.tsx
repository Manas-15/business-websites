"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Grid3x3, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { GalleryImage } from "@/types/content";

/*
 * Full-screen photo viewer for gallery sections. Wrap the preview grid in
 * <GalleryLightbox>, make tiles clickable with <GalleryTileButton>, and add
 * <GalleryViewAllButton> under the grid. The popup shows a grid of every photo;
 * choosing one shows it large with previous/next controls (arrow keys work).
 * Built on the native <dialog>, so Esc and focus handling come for free.
 */

type OpenAt = (index: number | null) => void;
const LightboxContext = createContext<OpenAt>(() => {});

export function GalleryLightbox({ images, title = "Gallery", children }: { images: GalleryImage[]; title?: string; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  /** null shows the grid of all photos; a number shows that photo large. */
  const [active, setActive] = useState<number | null>(null);

  const open = useCallback<OpenAt>((index) => {
    setActive(index);
    setIsOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (delta: number) => setActive((current) => (current === null ? current : (current + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen || active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, active, step]);

  const current = active === null ? null : images[active];

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={`${title}: all photos`}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          // A click on the dialog itself (not its content) is a click on the backdrop area.
          if (event.target === event.currentTarget) close();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
      >
        {isOpen ? (
          <div className="flex h-full flex-col">
            <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
              <p className="text-sm font-medium tracking-wide">
                {current ? `${(active ?? 0) + 1} / ${images.length}` : `${title} · ${images.length} photos`}
              </p>
              <div className="flex items-center gap-2">
                {current ? (
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <Grid3x3 className="size-4" aria-hidden="true" />
                    <span>All photos</span>
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close gallery"
                  className="rounded-full p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            </header>

            {current ? (
              <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-4 sm:px-16">
                <figure className="relative flex h-full w-full flex-col">
                  <div className="relative min-h-0 flex-1">
                    <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-white/75">{current.alt}</figcaption>
                </figure>
                {images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white sm:left-4 sm:p-3"
                    >
                      <ChevronLeft className="size-6" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white sm:right-4 sm:p-3"
                    >
                      <ChevronRight className="size-6" aria-hidden="true" />
                    </button>
                  </>
                ) : null}
              </div>
            ) : (
              <ul className="grid flex-1 auto-rows-min grid-cols-2 gap-2 overflow-y-auto p-3 sm:grid-cols-3 sm:p-6 lg:grid-cols-4">
                {images.map((image, index) => (
                  <li key={`${index}-${image.src}`} className="relative aspect-square overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`View photo ${index + 1}: ${image.alt}`}
                      className="group absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </dialog>
    </LightboxContext.Provider>
  );
}

/** Covers a preview tile so clicking it opens the popup at that photo. */
export function GalleryTileButton({ index, label }: { index: number; label: string }) {
  const open = useContext(LightboxContext);
  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={`Open photo: ${label}`}
      className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
    />
  );
}

/** "View all photos" button shown under a gallery preview. */
export function GalleryViewAllButton({ count, className = "" }: { count: number; className?: string }) {
  const open = useContext(LightboxContext);
  return (
    <div className={`mt-8 flex justify-center ${className}`}>
      <button
        type="button"
        onClick={() => open(null)}
        className="inline-flex items-center gap-2 border border-current px-6 py-3 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Grid3x3 className="size-4" aria-hidden="true" />
        View all {count} photos
      </button>
    </div>
  );
}
