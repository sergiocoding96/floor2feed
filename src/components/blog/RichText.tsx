"use client";

import { Fragment } from "react";

interface TextNode {
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface ElementNode {
  type?: string;
  tag?: string;
  children?: (TextNode | ElementNode)[];
  url?: string;
  value?: {
    url?: string;
    alt?: string;
  };
  listType?: string;
}

interface RichTextProps {
  content: {
    root?: {
      children?: ElementNode[];
    };
  };
}

function renderText(node: TextNode): React.ReactNode {
  let text: React.ReactNode = node.text || "";

  if (node.bold) text = <strong>{text}</strong>;
  if (node.italic) text = <em>{text}</em>;
  if (node.underline) text = <u>{text}</u>;
  if (node.strikethrough) text = <s>{text}</s>;
  if (node.code) text = <code className="bg-silver/50 px-1.5 py-0.5 rounded text-sm">{text}</code>;

  return text;
}

function renderNode(node: TextNode | ElementNode, index: number): React.ReactNode {
  // Text node
  if ("text" in node && node.text !== undefined) {
    return <Fragment key={index}>{renderText(node as TextNode)}</Fragment>;
  }

  const elementNode = node as ElementNode;
  const children = elementNode.children?.map((child, i) => renderNode(child, i));

  switch (elementNode.type) {
    case "heading":
      const tag = elementNode.tag || "h2";
      const headingClasses: Record<string, string> = {
        h1: "text-3xl md:text-4xl font-bold mb-6 mt-10",
        h2: "text-2xl md:text-3xl font-bold mb-4 mt-8",
        h3: "text-xl md:text-2xl font-semibold mb-3 mt-6",
        h4: "text-lg md:text-xl font-semibold mb-2 mt-4",
      };
      const className = headingClasses[tag] || "";
      if (tag === "h1") return <h1 key={index} className={className}>{children}</h1>;
      if (tag === "h3") return <h3 key={index} className={className}>{children}</h3>;
      if (tag === "h4") return <h4 key={index} className={className}>{children}</h4>;
      return <h2 key={index} className={className}>{children}</h2>;

    case "paragraph":
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {children}
        </p>
      );

    case "list":
      if (elementNode.listType === "number") {
        return (
          <ol key={index} className="list-decimal list-inside mb-4 space-y-2 ml-4">
            {children}
          </ol>
        );
      }
      return (
        <ul key={index} className="list-disc list-inside mb-4 space-y-2 ml-4">
          {children}
        </ul>
      );

    case "listitem":
      return <li key={index}>{children}</li>;

    case "link":
      return (
        <a
          key={index}
          href={elementNode.url}
          className="text-gold hover:text-bronze underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );

    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-gold pl-4 italic my-6 text-midnight/80">
          {children}
        </blockquote>
      );

    case "upload":
      if (elementNode.value?.url) {
        return (
          <figure key={index} className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={elementNode.value.url}
              alt={elementNode.value.alt || ""}
              className="rounded-lg w-full"
            />
          </figure>
        );
      }
      return null;

    default:
      return <Fragment key={index}>{children}</Fragment>;
  }
}

export function RichText({ content }: RichTextProps) {
  if (!content?.root?.children) {
    return null;
  }

  return (
    <div className="prose prose-lg max-w-none text-midnight/80">
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}
