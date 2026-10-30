import type { FAQ, Point } from "./types";

/** Pillar page: /permanent-outdoor-lighting/ */
export const pillar: {
  metaDescription: string;
  heroSubhead: string;
  sections: { id: string; heading: string; paragraphs: string[] }[];
  howItWorks: Point[];
  costFactors: Point[];
  comparison: { aspect: string; permanent: string; traditional: string }[];
  faqs: FAQ[];
} = {
  metaDescription:
    "What is permanent outdoor lighting? How it works, what affects cost, and how it compares with traditional Christmas lights, explained for New Mexico homes.",
  heroSubhead:
    "Everything Albuquerque homeowners should know about year-round, app-controlled LED lighting: how it works, what drives cost, and whether it beats hanging lights every December.",
  sections: [
    {
      id: "what-is-permanent-outdoor-lighting",
      heading: "What Is Permanent Outdoor Lighting?",
      paragraphs: [
        "Permanent outdoor lighting is a year-round LED system mounted along the edges of your home, usually the roofline, parapet or eaves, inside a slim, low-profile track. Instead of clipping strands to the gutter every November and pulling them down every January, the lights are installed once and stay up for good.",
        "During the day, the track blends into your fascia, trim or stucco so well that most people never notice it. After dark, you decide what it does. A soft warm white outline for everyday curb appeal, a red-and-green chase in December, orange and purple in October, cherry and silver on a Lobos game day: it all comes from the same lights, controlled from an app on your phone.",
        "Think of it less as holiday decor and more as a lighting feature of the house itself, like a porch light that can do a lot more. Homeowners choose it for convenience, safety and curb appeal. Businesses choose it for brand colors and after-hours visibility.",
      ],
    },
    {
      id: "how-permanent-lighting-works",
      heading: "How Permanent Lighting Works",
      paragraphs: [
        "Every system has four parts working together. A low-profile track is fastened to your home and holds the lights in a clean, straight line. Inside the track sit individually addressable LED nodes, meaning each light can show its own color and brightness. A controller, typically mounted in the garage or a protected spot near power, sends instructions down the line. And the app on your phone is where you pick scenes, build designs and set schedules.",
        "Most homes are divided into zones, such as the front roofline, the back roofline, the garage or a patio. Zones let you run different looks at the same time: festive color out front for the neighbors, calm warm white over the backyard portal where you're having dinner.",
        "Schedules are what make the system feel effortless. You can have lights fade on at sunset, dim late in the evening and switch to themed scenes on dates you choose. Many homeowners program the whole year in one sitting and simply enjoy it from then on. The system is also compatible with popular voice assistants, and many designs offer music-reactive effects for parties.",
      ],
    },
    {
      id: "permanent-vs-traditional-christmas-lights",
      heading: "Permanent vs. Traditional Christmas Lights",
      paragraphs: [
        "Traditional Christmas lights are a yearly project. Someone hauls out the bins, untangles strands, tests for dead bulbs, climbs the ladder, clips everything to the gutter and hopes the first windstorm doesn't undo it. A few weeks later, the process runs in reverse. Hiring a seasonal crew saves the climbing but becomes a recurring expense for a single look in a single season.",
        "Permanent lighting replaces all of that with one installation. There's nothing to store, nothing to untangle and no annual ladder day. Because the lights are fastened to the structure, they don't sag or blow loose. And because each LED is addressable, you aren't limited to one color scheme; the same lights cover Christmas, Halloween, the Fourth of July and every ordinary Tuesday.",
        "Traditional lights still have their place. They cost less up front, and some families love the ritual of decorating together. The right choice depends on how often you decorate, whether you value everyday lighting, how tall and complex your roofline is and how long you plan to stay in the home. The comparison table on this page lays out the differences side by side.",
      ],
    },
    {
      id: "where-it-can-go",
      heading: "Where Permanent Lighting Can Go",
      paragraphs: [
        "The roofline is the most popular placement because it outlines the whole house and is seen from the street. On pitched roofs, the track tucks under the drip edge along the fascia. On flat-roofed Pueblo Revival and Territorial homes, it follows the parapet cap, tracing every step and corner while leaving clean breaks at canales.",
        "Beyond the roof, the same technology works along block walls and fences, under portal and ramada beams, around pergolas and patios, and as accent lighting over entries and garage doors. Landscape fixtures can wash a wall, uplight a tree or line a path, and they can all live in the same app as your roofline.",
        "Commercial properties use permanent lighting on storefront parapets, restaurant patios, office buildings, dealership showrooms and HOA monument signs. Anywhere a clean line of light improves the look or visibility of a building is a candidate.",
      ],
    },
    {
      id: "built-for-new-mexico",
      heading: "Built for New Mexico Conditions",
      paragraphs: [
        "The high desert is hard on outdoor equipment. Albuquerque sits more than a mile above sea level, so UV exposure is intense almost every day. Spring brings weeks of strong wind, summer brings monsoon downpours and hail, and winter swings between freezing nights and bright, sunny afternoons.",
        "Permanent lighting is designed with those conditions in mind. The track is mechanically fastened rather than clipped, so wind doesn't peel it away. The LEDs sit inside a protective channel, shielded from blowing dust and the worst of the sun. Components are rated for outdoor use and temperature swings that crack the plastic clips seasonal strands depend on.",
        "Local know-how matters, too. Our crew works on stucco, parapets, canales and the full range of Albuquerque-area home styles every day. We route runs to keep drainage clear, seal penetrations and choose finishes that blend with your exterior. And because we're local, service is a phone call away, backed by our local warranty.",
      ],
    },
    {
      id: "is-it-worth-it",
      heading: "Is Permanent Outdoor Lighting Worth It?",
      paragraphs: [
        "For many homeowners, yes, especially if you decorate for more than one holiday, value an attractive home after dark, or have a tall or complex roofline that makes seasonal decorating risky. The value shows up every night you use it, not just in December.",
        "It may be less compelling if you only decorate occasionally, plan to move soon, or genuinely enjoy hanging lights as a family tradition. The best way to decide is to see a design for your own home and a written estimate based on your actual roofline. We're happy to walk you through both, with no pressure either way.",
      ],
    },
  ],
  howItWorks: [
    {
      title: "Low-profile track",
      body: "A slim channel is fastened to your fascia, eave or parapet and finished to blend with your trim or stucco. It holds the lights in a straight, protected line and is barely visible during the day.",
    },
    {
      title: "Addressable LED nodes",
      body: "Inside the track, each LED can display its own color and brightness. That's what makes patterns, chases, fades and multi-color holiday designs possible, along with a clean, even warm white for everyday use.",
    },
    {
      title: "Controller",
      body: "A compact controller, usually mounted in the garage or another protected spot near power, sends instructions to the lights. It runs your schedules and splits the home into zones you can control separately.",
    },
    {
      title: "Smartphone app",
      body: "The app is where you choose scenes, build and save your own designs, adjust brightness and set schedules for sunset, bedtime and holidays. It's compatible with popular voice assistants, too.",
    },
  ],
  costFactors: [
    {
      title: "Linear footage",
      body: "The single biggest factor. The more feet of roofline, parapet or wall you want lit, the more track and LEDs the project needs. Lighting just the front of the house is a smaller scope than the full perimeter.",
    },
    {
      title: "Roofline complexity",
      body: "Straight runs are faster to install than rooflines with many corners, gables, dormers or stepped parapets. Each change in direction takes careful measuring and fitting for a clean result.",
    },
    {
      title: "Number of stories",
      body: "Two-story and taller homes require additional equipment, setup and care to install safely, which affects time and scope compared with a single-story ranch.",
    },
    {
      title: "Parapet vs. pitched roof",
      body: "Pitched roofs typically mount along the fascia under the drip edge. Flat roofs with parapets mount along or below the cap and need planning around canales and scuppers. Each approach has its own requirements.",
    },
    {
      title: "Controllers and zones",
      body: "A simple home may need one controller and a couple of zones. Larger homes, detached garages or designs with many independently controlled areas may need more, which adds to the project.",
    },
    {
      title: "Power access",
      body: "The controller needs a suitable power source nearby. If an outlet is already in a good spot, setup is straightforward. If not, additional work may be needed to bring power where it's required.",
    },
    {
      title: "Add-ons",
      body: "Landscape lighting, block wall and fence runs, patio and ramada lighting, and security accents can all join the same system. Each adds to the scope, and each can be added now or later.",
    },
  ],
  comparison: [
    {
      aspect: "Installation",
      permanent: "Installed once by a professional crew",
      traditional: "Hung and removed every season",
    },
    {
      aspect: "Ladder work",
      permanent: "None after installation",
      traditional: "Every fall and every winter",
    },
    {
      aspect: "Daytime appearance",
      permanent: "Low-profile track blends with trim and stucco",
      traditional: "Visible clips, wires and bulbs while up",
    },
    {
      aspect: "Colors and effects",
      permanent: "Any color, pattern or animation from the app",
      traditional: "Limited to the strands you bought",
    },
    {
      aspect: "Occasions",
      permanent: "Every holiday plus everyday warm white",
      traditional: "Usually one season per year",
    },
    {
      aspect: "Scheduling",
      permanent: "Sunset, bedtime and holiday schedules built in",
      traditional: "Manual switch or a basic plug-in timer",
    },
    {
      aspect: "Wind and weather",
      permanent: "Fastened track holds through wind and storms",
      traditional: "Clips loosen, strands sag or blow off",
    },
    {
      aspect: "Storage",
      permanent: "Nothing to store",
      traditional: "Bins of lights to store, untangle and test",
    },
    {
      aspect: "Cost pattern",
      permanent: "One-time installation investment",
      traditional: "Lower up front, recurring time or crew cost",
    },
  ],
  faqs: [
    {
      q: "What is permanent outdoor lighting?",
      a: "It's a year-round LED lighting system installed in a low-profile track along your roofline, parapet or other edges of your home. Each LED is individually addressable, so you can display warm white, solid colors or animated patterns. Everything is controlled from a smartphone app, and the track blends into your exterior during the day.",
    },
    {
      q: "How much does permanent lighting cost?",
      a: "Cost depends on your home: mainly linear footage, roofline complexity, number of stories, parapet versus pitched roof, the number of controllers and zones, power access and any add-ons. Because every home is different, we measure on site and provide a written estimate rather than quoting a one-size-fits-all number.",
    },
    {
      q: "Is permanent lighting better than traditional Christmas lights?",
      a: "It depends on how you use them. If you decorate for multiple holidays, want everyday curb appeal or have a roofline that's risky to climb, permanent lighting usually wins on convenience and flexibility. If you decorate rarely or love the tradition of hanging lights, seasonal strands may still suit you. The comparison table above lays out the trade-offs.",
    },
    {
      q: "Can you see permanent lights during the day?",
      a: "Barely. The track is slim and mounted under the drip edge, along the fascia or on the parapet cap, with a finish chosen to blend with your trim or stucco. Most neighbors never notice it during the day. That invisible-by-day quality is one of the biggest reasons people choose permanent lighting.",
    },
    {
      q: "How does permanent lighting hold up in New Mexico weather?",
      a: "It's designed for it. The track is fastened to the structure so wind can't pull it loose, and the LEDs sit inside a protective channel that shields them from dust and intense sun. Components are rated for outdoor use, heavy rain and freezing nights. If a section ever needs attention, our local crew handles service.",
    },
    {
      q: "Can I add more lighting later?",
      a: "Yes. Most systems can be expanded. Many homeowners start with the front roofline and later add the back of the house, block walls, landscape lighting or patio lighting. New sections join the same app, so your scenes and schedules work across the whole property.",
    },
  ],
};
