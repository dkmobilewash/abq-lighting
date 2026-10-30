import type { Feature } from "./types";

/**
 * Feature tiles on city pages + home ("Why [City] Homeowners Choose...").
 * EDIT THIS LIST so it only includes features the installed system actually has.
 */
export const systemFeatures: Feature[] = [
  { icon: "smartphone", title: "App Control", body: "Change colors, brightness and scenes from your phone, wherever you are." },
  { icon: "palette", title: "Millions of Colors", body: "Dial in a soft warm white for everyday or any color you can imagine for the holidays." },
  { icon: "sunset", title: "Sunrise & Sunset Timer", body: "Lights follow Albuquerque's changing dusk and dawn times automatically all year." },
  { icon: "clock", title: "Scheduling", body: "Set holiday scenes months ahead and let them switch on and off by themselves." },
  { icon: "layers", title: "Multi-Zone Control", body: "Run the front, back, wall and patio as separate zones with different looks." },
  { icon: "mic", title: "Voice Assistant Compatible", body: "Works with popular voice assistants for hands-free on, off and scene changes." },
  { icon: "sun", title: "UV-Resistant Low-Profile Track", body: "A slim channel color-matched to your fascia or stucco, built to stand up to high-desert sun." },
  { icon: "zap", title: "Energy-Efficient LEDs", body: "Long-life LEDs that sip power compared with old incandescent strands." },
  { icon: "hammer", title: "One-Time Install", body: "Installed once by our crew. No ladders, no tangled strands, no January takedown." },
  { icon: "shield", title: "Local Warranty & Service", body: "Backed by our warranty and serviced by a crew based right here in Albuquerque." },
  { icon: "users", title: "Multi-User Access", body: "Share control with everyone in the household so anyone can change the scene." },
];

/** §15 "Smart Lighting Features for [City], NM" — exactly 6 cards. */
export const smartFeatures: Feature[] = [
  { icon: "smartphone", title: "App Control & Customization", body: "Pick colors, build your own patterns, adjust brightness and save favorite scenes in a few taps." },
  { icon: "calendar", title: "Scheduling & Automation", body: "Load the whole year's holidays at once, from Valentine's red to luminaria-season amber, and let the calendar run it." },
  { icon: "sunset", title: "Sunset-to-Sunrise Timer", body: "Lights come on at dusk and switch off at dawn or a time you choose, adjusting as the seasons change." },
  { icon: "music", title: "Music Sync & Effects", body: "Chases, twinkles, fades and music-reactive effects for parties, game nights and the Fourth of July." },
  { icon: "mic", title: "Voice & Smart-Home Integration", body: "Compatible with popular voice assistants so you can say the word and switch scenes." },
  { icon: "layers", title: "Multi-Zone Management", body: "Control the roofline, parapets, walls and patio independently or link them into one show." },
];

/** Trust strip on the homepage. */
export const trustItems: Feature[] = [
  { icon: "badge-check", title: "Licensed & Insured", body: "New Mexico licensed contractor." },
  { icon: "map-pin", title: "Local Albuquerque Crew", body: "We live and work here." },
  { icon: "shield", title: "Local Warranty", body: "Backed and serviced locally." },
  { icon: "ruler", title: "Free Custom Design", body: "No-obligation consultation." },
];
