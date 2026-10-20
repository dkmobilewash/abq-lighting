import Link from "next/link";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  a: ({ href = "", children, ...rest }) =>
    href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
