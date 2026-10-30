import type { FAQ } from "./types";

/** Master FAQ page, grouped by topic. */
export const faqGroups: { slug: string; heading: string; faqs: FAQ[] }[] = [
  {
    slug: "basics",
    heading: "The Basics",
    faqs: [
      {
        q: "What is permanent outdoor lighting?",
        a: "Permanent outdoor lighting is a low-profile track mounted along your roofline, parapet or other edges of your home, filled with individually addressable LEDs. It stays up year-round and is controlled from an app on your phone. You can run soft warm white for everyday curb appeal or switch to colors and patterns for holidays, game days and special occasions.",
      },
      {
        q: "How is it different from regular Christmas lights?",
        a: "Seasonal strands get clipped to gutters every fall and pulled down every winter. Permanent lighting is installed once by our crew, fastened to the structure, and blends into your trim during the day. Instead of one look for one season, you get thousands of color and pattern options for every occasion, all on a schedule you set from your phone.",
      },
      {
        q: "Can I really use the lights all year?",
        a: "Yes, and most homeowners do. A soft warm white outline on a dusk-to-late schedule is the most common everyday setting. From there, you might switch to orange and purple in October, red and green in December, red, white and blue in July, or cherry and silver for a Lobos game. The system is designed to be used every night, not just in December.",
      },
      {
        q: "Will I see the lights during the day?",
        a: "Very little. The track is slim and mounted along the fascia, under the drip edge or on the parapet cap, and we choose a finish that blends with your trim or stucco. Most people passing by during the day never notice it. At night, though, the lights give your home a clean, finished outline.",
      },
      {
        q: "What colors and effects can the lights display?",
        a: "Each LED can be set individually, so you can create solid colors, multi-color patterns, gentle fades, twinkles, chases and other animated effects. The app includes ready-made scenes for popular holidays, and you can build and save your own. Many people keep a couple of favorite warm white settings for everyday use.",
      },
      {
        q: "Is permanent lighting just for homes?",
        a: "No. We install permanent lighting on storefronts, restaurants, offices, car dealerships, multi-tenant centers and HOA community entrances. Businesses use it for brand colors, seasonal themes and after-hours visibility without paying for lifts and seasonal crews every year. See our commercial permanent lighting page for more.",
      },
    ],
  },
  {
    slug: "cost",
    heading: "Cost & Planning",
    faqs: [
      {
        q: "How is the cost of permanent lighting determined?",
        a: "Every project is priced to the home. The biggest factor is linear footage, meaning how many feet of roofline or edge you want lit. Roofline complexity, the number of stories, whether you have a pitched roof or parapets, how many zones or controllers you need, access to power and any add-ons such as landscape or patio lighting all play a role. We provide a written estimate after measuring.",
      },
      {
        q: "Does a two-story or flat-roof home change the price?",
        a: "It can. Taller homes need more equipment and setup time, and complex rooflines with many corners, gables or parapet steps take longer to route cleanly. Flat roofs with parapets and canales need careful planning around drainage. None of this rules a home out; it simply shapes the scope, which we explain line by line in your estimate.",
      },
      {
        q: "Do I have to light the whole house?",
        a: "Not at all. Many homeowners start with the street-facing front, where most of the visual impact is. Others add the garage, the back roofline facing the patio, or a side that faces the mountains. We'll show you a few coverage options during your estimate so you can choose what fits your goals and budget.",
      },
      {
        q: "Can I start small and add more later?",
        a: "Yes. Systems are designed to expand. You can begin with the front roofline and add the back of the house, a block wall, landscape lighting or patio lighting later. New sections can be added to the same app so scenes and schedules work together across the whole property.",
      },
      {
        q: "How does permanent lighting compare with hiring a seasonal installer?",
        a: "A seasonal hang-and-remove service is a recurring cost every year, usually for a single holiday look. Permanent lighting is a one-time installation that you use every night for every occasion. Whether it makes sense for you depends on how often you decorate, how much you value everyday curb appeal and how long you plan to stay in the home. Our pillar guide walks through the trade-offs.",
      },
    ],
  },
  {
    slug: "installation",
    heading: "Installation",
    faqs: [
      {
        q: "How long does installation take?",
        a: "It depends on linear footage, the number of stories and how complex your roofline is. A simple single-story ranch is a very different job from a two-story home with many gables or a stepped parapet. We'll give you a realistic schedule after measuring, and our crew finishes by programming the controller and walking you through the app.",
      },
      {
        q: "Do I need to be home during the install?",
        a: "Not for the whole visit, but we like to have you there at the start to confirm the layout and at the end for a walkthrough of the app. We'll need access to the outlet or power location for the controller. If you can't be home, we'll work out a plan with you ahead of time.",
      },
      {
        q: "Where does the controller go, and what power does it need?",
        a: "The controller usually goes in a garage, utility area or another protected spot near an available outlet. During the estimate, we'll look at your power access and recommend the best location. If an outlet isn't conveniently placed, we'll explain your options, which can affect the project scope.",
      },
      {
        q: "Will installation damage my roof or stucco?",
        a: "We install to protect your home. The track fastens into the fascia, trim or parapet using methods suited to your construction, and penetrations are sealed against water. We don't walk on roofs or mount hardware in ways that compromise roofing materials, and we take care around stucco to keep the work clean and tidy.",
      },
      {
        q: "Can you install on flat roofs with parapets?",
        a: "Yes. Flat roofs with parapets are common across Albuquerque, and they look striking when outlined. We run the track along the parapet cap or just below it, follow each step and corner, and leave clean breaks at canales so water drains freely during monsoon storms. See our parapet and flat roof lighting page for details.",
      },
      {
        q: "When is the best time of year to install?",
        a: "Any time. Fall fills up quickly as people plan for the holidays, so booking in spring or summer often means more flexible scheduling. Because the system stays up all year, an off-season install gives you months of warm white evenings and summer holidays before December arrives.",
      },
    ],
  },
  {
    slug: "app",
    heading: "The App & Controls",
    faqs: [
      {
        q: "How do I control the lights?",
        a: "Everything runs from an app on your smartphone. You can turn lights on and off, choose colors and patterns, adjust brightness, and pick from preset holiday scenes or your own saved designs. Our crew sets up the app with you at the end of installation and makes sure you're comfortable before we leave.",
      },
      {
        q: "Can I schedule the lights?",
        a: "Yes. You can set lights to turn on at a specific time or at sunset, turn off late at night, and switch scenes automatically for upcoming holidays. Many homeowners set up the whole year in one sitting: warm white most nights, with themed scenes queued up for Halloween, Christmas, the Fourth of July and other dates that matter to them.",
      },
      {
        q: "Can I control different parts of the house separately?",
        a: "Yes, by setting up zones. The front roofline, back roofline, garage, patio and landscape lighting can each be a separate zone, so you might run festive colors out front while keeping soft warm white over the backyard portal. We plan zones with you during design so the controls match how you use your home.",
      },
      {
        q: "Does the system work with voice assistants?",
        a: "The system is compatible with popular voice assistants, so you can turn lights on or off or switch scenes with a quick voice command once it's connected. The app remains the main place to build designs and schedules, and we'll help you link a voice assistant if you'd like to use one.",
      },
      {
        q: "Can I create my own patterns and colors?",
        a: "Absolutely. Beyond the preset scenes, you can choose individual colors, build multi-color patterns, set motion effects and adjust speed and brightness, then save your creations for later. Some designs even include music-reactive effects for parties. If you'd like help, our team is happy to suggest designs for your home and the occasions you celebrate.",
      },
    ],
  },
  {
    slug: "durability",
    heading: "Durability in New Mexico",
    faqs: [
      {
        q: "Can the lights handle New Mexico's sun and UV?",
        a: "They're built for it. Albuquerque sits more than a mile above sea level, so the sun is intense nearly every day of the year. Our track and lenses are designed for long-term outdoor exposure, and the LEDs sit inside the channel rather than hanging loose, which helps protect them on south- and west-facing walls that take the strongest afternoon sun.",
      },
      {
        q: "What about spring wind season?",
        a: "Wind is the main reason seasonal lights fail here. Clip-on strands loosen, sag and blow away during March through May gusts. Our track is mechanically fastened to the structure, so it doesn't rely on clips or gutter edges. That matters most on exposed sites like the West Mesa, Rio Rancho and foothill lots near the Sandias.",
      },
      {
        q: "Will monsoon rain and hail damage the lights?",
        a: "The system is designed for outdoor weather, including heavy summer rain. Components are rated for wet conditions, and on flat roofs we route the track to keep canales and scuppers clear so water drains normally. Severe hail can damage many things on a home's exterior; if a section ever needs attention, our local crew can take care of it.",
      },
      {
        q: "Do freezing winter nights affect the lights?",
        a: "No. LEDs perform well in cold weather, and the track is designed for outdoor temperature swings. New Mexico winters often bring freezing nights followed by bright sunny days, a cycle that cracks plastic clips on seasonal strands. Because our system is fastened rather than clipped, freeze-thaw cycles aren't a problem.",
      },
      {
        q: "Does blowing dust cause problems?",
        a: "Dust is part of life in the high desert, and the system is designed to live with it. Because the LEDs sit inside a protective channel, they're shielded from much of what blows through. Over time, a light film can build up on any outdoor surface, and an occasional gentle rinse keeps everything looking its best.",
      },
    ],
  },
  {
    slug: "hoa",
    heading: "HOAs, Permits & Rules",
    faqs: [
      {
        q: "Do I need HOA approval for permanent lighting?",
        a: "It depends on your community. Many planned neighborhoods in the Albuquerque area have architectural review committees that require approval for exterior changes, while many older neighborhoods have no HOA at all. Check your community's guidelines before installing; we're happy to help you figure out what your HOA is likely to ask for.",
      },
      {
        q: "Will you help me with my HOA submission?",
        a: "Yes. We help prepare the design information most HOAs ask for, such as a layout showing where the track runs, product details and photos of the finish. We can't guarantee approval, since that decision belongs to your committee, but a clear and complete submission usually makes the process easier.",
      },
      {
        q: "Do I need a permit for permanent lighting?",
        a: "Requirements vary by jurisdiction and by the scope of the work, especially if new electrical work is involved. Many residential projects connect to existing power, while larger or commercial projects may need more. We'll review your project and explain what's typically required. We're licensed and insured and follow applicable codes.",
      },
      {
        q: "Are there rules about outdoor lighting and night skies in New Mexico?",
        a: "New Mexico values its dark skies, and some communities have outdoor lighting rules that address glare and light trespass. Permanent roofline lighting is generally low intensity, and we design with shielding, sensible brightness and warm color temperatures in mind. If your city, county or HOA has specific requirements, we'll design to respect them.",
      },
      {
        q: "Can I use colors year-round if my HOA has lighting rules?",
        a: "Many homeowners in HOA neighborhoods run warm white most nights and save colors for holidays, which tends to fit comfortably within typical guidelines. Because you control everything from the app, it's easy to follow any seasonal or color rules your HOA has. Review your community's guidelines, and we'll help you plan scenes that work within them.",
      },
      {
        q: "Will the lights bother my neighbors?",
        a: "Thoughtful design prevents that. Roofline lighting is aimed outward along your home's edges, and brightness is fully adjustable. You can schedule lights to turn off or dim late at night. If a particular section faces a neighbor's window, we can plan the layout and settings to keep glare to a minimum.",
      },
    ],
  },
  {
    slug: "warranty",
    heading: "Warranty & Service",
    faqs: [
      {
        q: "Is the system covered by a warranty?",
        a: "Yes. Every installation is backed by our local warranty. The specific terms are spelled out on our warranty page, and we'll walk through them with you before your installation so you know exactly what's covered.",
      },
      {
        q: "What happens if a light stops working?",
        a: "Give us a call. Because each LED is individually addressable, a problem usually affects a small section rather than the whole run, and that section can typically be replaced without redoing the installation. Our local crew will diagnose the issue and get your lights back to full brightness. See our warranty page for coverage details.",
      },
      {
        q: "Who services the lights after installation?",
        a: "We do. We're a local Albuquerque company, and the same team that designs and installs your system handles service. You won't be routed to an out-of-state call center; you'll talk with people who know high-desert homes and understand how New Mexico weather affects outdoor equipment.",
      },
      {
        q: "Do permanent lights need regular maintenance?",
        a: "Very little. There's no seasonal hanging or removal, no bulbs to swap and no strands to untangle. Occasionally rinsing off dust and checking that the app is up to date is about all most homeowners do. If you notice anything unusual, contact us and we'll take a look.",
      },
      {
        q: "What happens if I sell my home?",
        a: "Permanent lighting stays with the house, and many buyers see it as an appealing feature. We can help the new owners get set up with the app. For details on how coverage applies after a sale, see our warranty page or ask our team.",
      },
    ],
  },
];

/** Albuquerque-wide FAQs for the homepage. */
export const homeFaqs: FAQ[] = [
  {
    q: "Where in the Albuquerque area do you install permanent lighting?",
    a: "We install across Albuquerque, from the Northeast Heights, Nob Hill and the North Valley to the Westside, Four Hills and Mesa del Sol. We also serve Rio Rancho, Corrales, Los Ranchos, Bernalillo, Placitas, the East Mountains and communities south to Los Lunas and Belen. Check our service areas page or ask when you request an estimate.",
  },
  {
    q: "Why is permanent lighting such a good fit for Albuquerque homes?",
    a: "Albuquerque's mix of stucco walls, parapets and long ranch eaves looks fantastic outlined in light, and our weather is hard on seasonal strands. Wind, intense sun and freeze-thaw nights take a toll on clip-on lights. A fastened, low-profile track avoids those problems and lets you enjoy every holiday without climbing a ladder.",
  },
  {
    q: "Does permanent lighting work on Pueblo Revival and flat-roof homes?",
    a: "Yes, and it's one of our favorite applications. On flat-roofed Pueblo Revival and Territorial homes, the track follows the parapet cap, tracing each step and corner for a crisp silhouette at night. We plan around canales and scuppers so drainage stays clear during monsoon season, and the finish blends with your stucco during the day.",
  },
  {
    q: "Can I light my house for Balloon Fiesta and Lobos games?",
    a: "Absolutely. Bright, multi-color scenes are perfect for Balloon Fiesta week in October, and cherry and silver make game days feel official. You can also set red and yellow for a Zia-inspired look or warm amber for luminaria season on Christmas Eve. Schedule scenes in advance so they come on automatically.",
  },
  {
    q: "How do the lights handle Albuquerque's spring wind?",
    a: "Very well, because nothing is clipped on. The track is fastened directly to your fascia or parapet, and the LEDs sit inside it. Seasonal strands tend to loosen and blow off during March through May gusts, especially on the West Mesa and in the foothills, but a permanent system is built to stay put.",
  },
  {
    q: "Are permanent lights only for Christmas?",
    a: "No. Most of our Albuquerque clients use them every night. Warm white on a dusk schedule adds curb appeal and helps guests find your home, and colors are ready for Halloween, the Fourth of July, Valentine's Day, game days and anything else you celebrate. Christmas is just the start.",
  },
  {
    q: "Do you work with Albuquerque businesses and HOAs?",
    a: "Yes. We light storefronts, restaurants, offices, car dealerships and multi-tenant centers across Albuquerque, along with HOA entrances and community monument signs. Businesses use permanent lighting for brand colors, seasonal themes and after-hours visibility without renting lifts every year.",
  },
  {
    q: "How do I get started?",
    a: "Request an estimate. We'll visit your home, measure the roofline, talk about how you'd like to use the lights and show you design options. You'll receive a clear written estimate covering the layout, zones and scope. If you live in an HOA neighborhood, we'll also help you prepare design information for architectural review.",
  },
];
