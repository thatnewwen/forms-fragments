import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, number, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-3xl font-bold decoration-underline hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-8xl font-light decoration-underline underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <div>
        {number} —{" "}
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      </div>
      <p className="text-sm">{description}</p>
    </li>
  );
}
