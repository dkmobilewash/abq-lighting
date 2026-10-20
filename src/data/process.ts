import type { Feature } from "./types";

/** The 4-step process used on /how-it-works/, home and service pages. */
export const processSteps: (Feature & { step: number })[] = [
  {
    step: 1,
    icon: "phone",
    title: "Free Consultation",
    body: "Tell us about your home or building. We look at your roofline, parapets, walls and power access, in person or from photos, and answer every question with no pressure.",
  },
  {
    step: 2,
    icon: "ruler",
    title: "Custom Design",
    body: "We map where the track goes, match its color to your fascia or stucco, plan zones and send a clear written quote. Need HOA approval? We provide the design details for your submission.",
  },
  {
    step: 3,
    icon: "hammer",
    title: "Install, Usually in One Day",
    body: "Our local crew installs the track, LEDs and controller, typically in a single day for most homes. Larger or more complex properties may take longer, and we tell you up front.",
  },
  {
    step: 4,
    icon: "smartphone",
    title: "App Setup & Support",
    body: "Before we leave, we connect the app, set your sunset schedule, load a few holiday scenes and show you how it all works. After that, we're a phone call away.",
  },
];
