import { ReactNode } from "react";

interface RichTextProps {
  children: ReactNode;
}

export function RichText({ children }: RichTextProps) {
  return (
    <div className="prose prose-lg max-w-none text-midnight/80 prose-headings:text-midnight prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-xl prose-h3:md:text-2xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6 prose-p:mb-4 prose-p:leading-relaxed prose-a:text-gold prose-a:hover:text-bronze prose-ul:list-disc prose-ul:ml-4 prose-ul:space-y-2 prose-ol:list-decimal prose-ol:ml-4 prose-ol:space-y-2 prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-midnight/80 prose-code:bg-silver/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-img:rounded-lg prose-hr:border-silver">
      {children}
    </div>
  );
}
