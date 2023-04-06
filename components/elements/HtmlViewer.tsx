import style from "StyleFarm/scss/modules/Viewer.module.scss";
import sanitizeHtml from "sanitize-html";

interface HtmlViewerProps {
  html: string;
}

const HtmlViewer = ({ html }: HtmlViewerProps) => {
  return (
    <div
      className={style["html-viewer"]}
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(html, {
          allowedTags: [
            "img",
            "strong",
            "p",
            "em",
            "strong",
            "h1",
            "h2",
            "ul",
            "ol",
            "li",
            "blockquote",
            "a",
            "u",
            "span",
            "div",
            "iframe",
          ],
          allowedAttributes: {
            span: ["style"],
            div: ["style"],
            "*": ["align", "data-wrapper-node"],
            img: ["src"],
            a: ["href", "target"],
            iframe: ["src", "allow", "allowfullscreen", "frameborder"],
          },
        }),
      }}
    ></div>
  );
};

export default HtmlViewer;
