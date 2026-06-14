import React from "react";

interface MarkdownViewProps {
  text: string;
}

export default function MarkdownView({ text }: MarkdownViewProps) {
  if (!text) return null;

  // Split text into paragraphs/lines
  const lines = text.split("\n");

  const parseInlineBold = (inputText: string): React.ReactNode[] => {
    const parts = inputText.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      // Every odd index was captured in the capturing group (the text inside **)
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-emerald-950">{part}</strong>;
      }
      return part;
    });
  };

  let inList = false;
  let listItems: React.ReactNode[] = [];
  const renderedElements: React.ReactNode[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      renderedElements.push(
        <ul key={`ul-${key}`} className="list-disc pl-5 my-3 space-y-1.5 text-slate-700">
          {...listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Headers
    if (trimmedLine.startsWith("### ")) {
      flushList(index);
      const headerText = trimmedLine.substring(4);
      renderedElements.push(
        <h4 key={index} className="text-md sm:text-lg font-semibold text-emerald-900 mt-5 mb-2 first:mt-0">
          {parseInlineBold(headerText)}
        </h4>
      );
    } else if (trimmedLine.startsWith("## ")) {
      flushList(index);
      const headerText = trimmedLine.substring(3);
      renderedElements.push(
        <h3 key={index} className="text-lg sm:text-xl font-bold text-emerald-900 mt-6 mb-3 first:mt-0">
          {parseInlineBold(headerText)}
        </h3>
      );
    } else if (trimmedLine.startsWith("# ")) {
      flushList(index);
      const headerText = trimmedLine.substring(2);
      renderedElements.push(
        <h2 key={index} className="text-xl sm:text-2xl font-extrabold text-emerald-950 mt-7 mb-4 first:mt-0">
          {parseInlineBold(headerText)}
        </h2>
      );
    }
    // Bullet lists
    else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      inList = true;
      const content = trimmedLine.substring(2);
      listItems.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {parseInlineBold(content)}
        </li>
      );
    }
    // Numbered lists
    else if (/^\d+\.\s+/.test(trimmedLine)) {
      inList = true;
      const content = trimmedLine.replace(/^\d+\.\s+/, "");
      listItems.push(
        <li key={`li-${index}`} className="list-decimal ml-1 leading-relaxed">
          {parseInlineBold(content)}
        </li>
      );
    }
    // Horizontal rule
    else if (trimmedLine === "---" || trimmedLine === "***") {
      flushList(index);
      renderedElements.push(<hr key={index} className="my-5 border-t border-slate-200" />);
    }
    // Empty line
    else if (trimmedLine === "") {
      flushList(index);
    }
    // Standard paragraph
    else {
      flushList(index);
      renderedElements.push(
        <p key={index} className="text-slate-700 leading-relaxed my-3 text-sm sm:text-base">
          {parseInlineBold(line)}
        </p>
      );
    }
  });

  // Flush any final list items
  flushList(lines.length);

  return <div className="space-y-1 text-slate-800">{renderedElements}</div>;
}
