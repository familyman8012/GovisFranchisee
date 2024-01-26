import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { HtmlViewerStyle } from './style';

interface HtmlViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  html?: string;
}
const HtmlViewer = React.forwardRef<HTMLDivElement, HtmlViewerProps>(
  ({ html, ...otherProps }, ref) => {
    return (
      <HtmlViewerStyle
        ref={ref}
        {...otherProps}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(html ?? '', {
            allowedTags: [
              'img',
              'strong',
              'p',
              'em',
              'strong',
              'h1',
              'h2',
              'ul',
              'ol',
              'li',
              'blockquote',
              'a',
              'u',
              'span',
              'div',
              'iframe',
            ],
            allowedAttributes: {
              span: ['style'],
              div: ['style'],
              '*': ['align', 'data-wrapper-node'],
              img: ['src'],
              a: ['href', 'target'],
              iframe: ['src', 'allow', 'allowfullscreen', 'frameborder'],
            },
          }),
        }}
      />
    );
  }
);

HtmlViewer.displayName = 'HtmlViewer';

export default HtmlViewer;
