"use client";

import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import type { Author, Media } from "@/payload-types";

interface BlogAuthorProps {
  author: Author;
}

export function BlogAuthor({ author }: BlogAuthorProps) {
  const avatar = author.avatar as Media | undefined;

  return (
    <div className="flex items-start gap-4 p-6 bg-pearl rounded-xl">
      {avatar?.url && (
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatar.url}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <h4 className="font-semibold text-midnight">{author.name}</h4>
        {author.role && (
          <p className="text-sm text-gold mb-2">{author.role}</p>
        )}
        {author.bio && (
          <p className="text-sm text-midnight/70 mb-3">{author.bio}</p>
        )}
        {author.social && (
          <div className="flex gap-3">
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-midnight/50 hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-midnight/50 hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
