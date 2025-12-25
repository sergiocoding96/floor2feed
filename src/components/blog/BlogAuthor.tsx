'use client'

import Image from 'next/image'
import { Twitter, Linkedin } from 'lucide-react'
import type { Author, Media } from '@/payload-types'

interface BlogAuthorProps {
  author: Author & {
    avatar?: Media | null
  }
}

export function BlogAuthor({ author }: BlogAuthorProps) {
  return (
    <div className="bg-silver/30 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        {author.avatar && typeof author.avatar !== 'string' && author.avatar.url && (
          <div className="flex-shrink-0">
            <Image
              src={author.avatar.url}
              alt={author.name}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gold font-medium uppercase tracking-wider">
              Written by
            </span>
          </div>
          <h3 className="text-xl font-semibold text-midnight mb-1">{author.name}</h3>
          {author.role && <p className="text-gray-600 text-sm mb-3">{author.role}</p>}
          {author.bio && <p className="text-gray-700">{author.bio}</p>}

          {/* Social Links */}
          {author.social && (author.social.twitter || author.social.linkedin) && (
            <div className="flex gap-3 mt-4">
              {author.social.twitter && (
                <a
                  href={`https://twitter.com/${author.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gold transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {author.social.linkedin && (
                <a
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gold transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
