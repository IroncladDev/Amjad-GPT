import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import hljs from "highlight.js";

const clean = (dirty: string) =>
  sanitizeHtml(dirty, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "p",
      "code",
      "pre",
      "br",
      "ul",
      "ol",
      "li",
      "s",
      "strike",
      "span",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
    ],
    allowedAttributes: {
      a: ["href"],
      img: ["src", "alt", "style"],
      span: ["class"],
    },
    allowedIframeHostnames: [],
  });

export const MarkdownWrapper = ({ children }: { children: string }) => {
  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function (code: string, lang: string) {
      try {
        return hljs.highlightAuto(code, [
          "html",
          "javascript",
          "markdown",
          "python",
          "go",
          "ruby",
          "rust",
          lang,
        ]).value;
      } catch (e) {
        return hljs.highlightAuto(code, [
          "html",
          "javascript",
          "markdown",
          "python",
          "go",
          "ruby",
          "rust",
        ]).value;
      }
    },
  });

  const html = clean(marked.parse(children));
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: clean(html) }}
    />
  );
};
