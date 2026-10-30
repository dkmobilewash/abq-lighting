import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="This Page Went Dark" intro="We couldn't find that page. Try one of these instead.">
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Home</Button>
        <Button href="/service-areas/" variant="secondary">Service Areas</Button>
        <Button href="/get-a-quote/" variant="secondary">Get a Quote</Button>
      </div>
    </PageHeader>
  );
}
