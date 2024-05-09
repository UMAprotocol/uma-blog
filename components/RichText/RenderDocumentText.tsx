import { BLOCKS, MARKS, Document } from "@contentful/rich-text-types";
import {
  RenderMark,
  RenderNode,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { ContentfulImage } from "../ContentfulImage/ContentfulImage";

// Map text-format types to custom components

const markRenderers: RenderMark = {
  [MARKS.BOLD]: (text) => <strong>{text}</strong>,
  [MARKS.ITALIC]: (text) => <em>{text}</em>,
  [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
  [MARKS.CODE]: (text) => <code>{text}</code>,
  [MARKS.SUPERSCRIPT]: (text) => <sup>{text}</sup>,
  [MARKS.SUBSCRIPT]: (text) => <sub>{text}</sub>,
};

const nodeRenderers: RenderNode = {
  [BLOCKS.DOCUMENT]: (_, children) => children,
  [BLOCKS.PARAGRAPH]: (_, children) => <p>{children}</p>,
  [BLOCKS.HEADING_1]: (_, children) => <h1 className="text-4xl">{children}</h1>,
  [BLOCKS.HEADING_2]: (_, children) => <h2 className="text-3xl">{children}</h2>,
  [BLOCKS.HEADING_3]: (_, children) => <h3 className="text-2xl">{children}</h3>,
  [BLOCKS.HEADING_4]: (_, children) => <h4 className="text-xl">{children}</h4>,
  [BLOCKS.HEADING_5]: (_, children) => <h5>{children}</h5>,
  [BLOCKS.HEADING_6]: (_, children) => <h6>{children}</h6>,
  [BLOCKS.EMBEDDED_ENTRY]: (_, children) => <div>{children}</div>,
  [BLOCKS.EMBEDDED_RESOURCE]: (_, children) => <div>{children}</div>,
  [BLOCKS.UL_LIST]: (_, children) => <ul>{children}</ul>,
  [BLOCKS.OL_LIST]: (_, children) => <ol>{children}</ol>,
  [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
  [BLOCKS.QUOTE]: (_, children) => <blockquote>{children}</blockquote>,
  [BLOCKS.HR]: () => <hr />,
  [BLOCKS.TABLE]: (_, children) => (
    <table>
      <tbody>{children}</tbody>
    </table>
  ),
  [BLOCKS.TABLE_ROW]: (_, children) => <tr>{children}</tr>,
  [BLOCKS.TABLE_HEADER_CELL]: (_, children) => <th>{children}</th>,
  [BLOCKS.TABLE_CELL]: (_, children) => <td>{children}</td>,
  [BLOCKS.EMBEDDED_ASSET]: (node) => {
    return <ContentfulImage className="max-w-[400px]" {...node.data.target} />;
  },

  //   [INLINES.ASSET_HYPERLINK]: (node) =>
  //     defaultInline(INLINES.ASSET_HYPERLINK, node as Inline),
  //   [INLINES.ENTRY_HYPERLINK]: (node) =>
  //     defaultInline(INLINES.ENTRY_HYPERLINK, node as Inline),
  //   [INLINES.RESOURCE_HYPERLINK]: (node) =>
  //     defaultInlineResource(INLINES.RESOURCE_HYPERLINK, node as Inline),
  //   [INLINES.EMBEDDED_ENTRY]: (node) =>
  //     defaultInline(INLINES.EMBEDDED_ENTRY, node as Inline),
  //   [INLINES.EMBEDDED_RESOURCE]: (node, children) =>
  //     defaultInlineResource(INLINES.EMBEDDED_RESOURCE, node as Inline),

  //   },
};

const options = {
  renderNode: nodeRenderers,
  renderMark: markRenderers,
};

export function renderDocumentText(content: Document) {
  return documentToReactComponents(content, options);
}
