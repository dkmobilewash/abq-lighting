import { LegalPage } from "@/components/LegalPage";
import { business } from "@/data/business";
import { metaFor } from "@/lib/page";

const path = "/privacy-policy/";
export const metadata = metaFor(path);

export default function Page() {
  return (
    <LegalPage path={path} title="Privacy Policy" updated="[DATE]">
      <p>{business.name} (&quot;we,&quot; &quot;us&quot;) respects your privacy. This policy explains what information we collect through this website and how we use it.</p>
      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Information you provide:</strong> name, email, phone, address, property details and messages you submit through our forms.</li>
        <li><strong>Automatically collected information:</strong> pages visited, referring URLs, campaign (UTM) parameters, device and browser type, collected through cookies and analytics tools.</li>
      </ul>
      <h2>How We Use Information</h2>
      <ul>
        <li>To respond to quote requests and schedule consultations</li>
        <li>To contact you by phone, text or email about your request, where you have consented</li>
        <li>To improve our website and measure advertising performance</li>
      </ul>
      <h2>Text Messages</h2>
      <p>If you opt in to text messages, message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. We do not sell or share your mobile number or SMS opt-in consent with third parties for their marketing.</p>
      <h2>Sharing</h2>
      <p>We do not sell your personal information. We share it only with service providers that help us operate our business (such as CRM, email and hosting providers), or when required by law.</p>
      <h2>Your Choices</h2>
      <p>You may request access to, correction of, or deletion of your information by contacting us at {business.email} or {business.phone}.</p>
      <h2>Contact</h2>
      <p>{business.name}, {business.street}, {business.city}, {business.state} {business.zip}</p>
    </LegalPage>
  );
}
