import Link from "next/link";
import type { ReactNode } from "react";
import { linkPhrases, type LinkPhrase } from "@/data/linkPhrases";

/**
 * Contextual internal linking for body copy.
 *
 * Create one Linker per page render and pass it to every <Prose>/<FAQAccordion> on that page.
 * It turns the first occurrence of each known phrase into a link, while:
 *  - never linking the current page to itself,
 *  - linking each destination at most once per page,
 *  - capping links per paragraph and per page so copy never looks spammy.
 */

const normalize = (s: string) => s.toLowerCase().replace(/[’]/g, "'");
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "['’]");

type Entry = { phrase: string; rule: LinkPhrase };
const entries: Entry[] = linkPhrases
  .flatMap((rule) => rule.phrases.map((phrase) => ({ phrase, rule })))
  .sort((a, b) => b.phrase.length - a.phrase.length);

const byPhrase = new Map(entries.map((e) => [normalize(e.phrase), e.rule]));
const pattern = new RegExp(
  `\\b(?:${entries.map((e) => `${escape(e.phrase)}${e.rule.notFollowedBy ?? ""}`).join("|")})(?![\\w-])`,
  "gi",
);

export type LinkerOptions = {
  /** Swap a destination for a more specific one, e.g. "/roofline-lighting/" → the local city×service page. */
  overrides?: Record<string, string>;
  maxPerParagraph?: number;
  maxPerPage?: number;
};

export class Linker {
  private used = new Set<string>();
  private count = 0;
  private overrides: Record<string, string>;
  private maxPerParagraph: number;
  private maxPerPage: number;

  constructor(private currentPath: string, opts: LinkerOptions = {}) {
    this.overrides = opts.overrides ?? {};
    this.maxPerParagraph = opts.maxPerParagraph ?? 2;
    this.maxPerPage = opts.maxPerPage ?? 16;
    this.used.add(currentPath);
  }

  /** Mark destinations that are already prominently linked elsewhere on the page. */
  exclude(...paths: string[]) {
    paths.forEach((p) => this.used.add(p));
    return this;
  }

  link(text: string): ReactNode {
    if (this.count >= this.maxPerPage) return text;
    const out: ReactNode[] = [];
    let last = 0;
    let inParagraph = 0;
    for (const m of text.matchAll(pattern)) {
      if (inParagraph >= this.maxPerParagraph || this.count >= this.maxPerPage) break;
      const rule = byPhrase.get(normalize(m[0]));
      if (!rule) continue;
      const override = this.overrides[rule.href];
      const href = override && override !== this.currentPath ? override : rule.href;
      if (this.used.has(href)) continue;
      this.used.add(href);
      this.used.add(rule.href);
      this.count++;
      inParagraph++;
      const i = m.index ?? 0;
      out.push(text.slice(last, i));
      out.push(
        <Link key={`${href}-${i}`} href={href} className="ctx-link">
          {m[0]}
        </Link>,
      );
      last = i + m[0].length;
    }
    if (!out.length) return text;
    out.push(text.slice(last));
    return out;
  }
}
