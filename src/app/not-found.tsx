import type { Metadata } from "next";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60svh] items-center py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Error 404</p>
        <h1 className="mt-4 font-heading text-4xl sm:text-5xl">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The link may be out of date, or the page may have moved. Head back to the home page to find what you need.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" size="lg">
            Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
