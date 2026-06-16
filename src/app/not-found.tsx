import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell>
      <Container className="py-24 md:py-32">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">404</p>
        <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-tight text-ink">
          This page does not exist.
        </h1>
        <ButtonLink href="/" className="mt-8" variant="secondary">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back home
        </ButtonLink>
      </Container>
    </PageShell>
  );
}
