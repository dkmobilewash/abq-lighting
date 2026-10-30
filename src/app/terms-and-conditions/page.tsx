import { LegalPage } from "@/components/LegalPage";
import { business } from "@/data/business";
import { metaFor } from "@/lib/page";

const path = "/terms-and-conditions/";
export const metadata = metaFor(path);

export default function Page() {
  return (
    <LegalPage path={path} title="Terms and Conditions" updated="[DATE]">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Website Content</h2>
      <p>Content on this site is for general information. Images labeled as placeholders or sample concepts are illustrations, not photos of completed projects. Product features depend on the system installed and may change.</p>
      <h2>Quotes</h2>
      <p>Submitting a quote request does not create a contract. Pricing, scope and warranty terms are set out in a written proposal and agreement provided by {business.name}.</p>
      <h2>Communications Consent</h2>
      <p>If you check the consent box on our forms, you agree to receive calls and text messages from {business.name} about your request at the number you provided, which may use automated technology. Consent is not a condition of purchase. Reply STOP to opt out.</p>
      <h2>Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, {business.name} is not liable for indirect or consequential damages arising from use of this website.</p>
      <h2>Governing Law</h2>
      <p>These terms are governed by the laws of the State of New Mexico.</p>
      <h2>Contact</h2>
      <p>{business.email} · {business.phone}</p>
    </LegalPage>
  );
}
