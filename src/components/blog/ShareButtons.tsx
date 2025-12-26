"use client";

import { Twitter, Linkedin, Facebook, Link2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-midnight/60">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-silver/50 hover:bg-gold hover:text-white text-midnight/70 transition-all duration-200"
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg bg-silver/50 hover:bg-gold hover:text-white text-midnight/70 transition-all duration-200"
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </button>
      {copied && (
        <span className="text-sm text-gold">Copied!</span>
      )}
    </div>
  );
}
