import { BLOCKS, MARKS, Document, INLINES } from "@contentful/rich-text-types";
import {
  RenderMark,
  RenderNode,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { ContentfulImage } from "../ContentfulImage/ContentfulImage";
import { Paragraph } from "./Paragraph";
import { Divider } from "../Divider";
import { isContentfulAsset } from "@/types/utils";
import { UmaBlogImageAsset } from "@/lib/contentful";
import Link from "next/link";
import { isExternal } from "../Link";

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
  [INLINES.HYPERLINK]: (node, children) => {
    const href = node.data.uri as string;
    return (
      <Link
        target={isExternal(href) ? "_blank" : undefined}
        className="underline hover:text-text"
        href={href}
        type="external"
      >
        {children}
      </Link>
    );
  },
  [BLOCKS.DOCUMENT]: (_, children) => children,
  [BLOCKS.PARAGRAPH]: (_, children) => <Paragraph>{children}</Paragraph>,
  [BLOCKS.HEADING_1]: (_, children) => (
    <h1 className="text-4xl text-text">{children}</h1>
  ),
  [BLOCKS.HEADING_2]: (_, children) => (
    <h2 className="text-3xl text-text">{children}</h2>
  ),
  [BLOCKS.HEADING_3]: (_, children) => (
    <h3 className="text-2xl text-text">{children}</h3>
  ),
  [BLOCKS.HEADING_4]: (_, children) => (
    <h4 className="text-xl text-text">{children}</h4>
  ),
  [BLOCKS.HEADING_5]: (_, children) => (
    <h5 className="text-xl text-text">{children}</h5>
  ),
  [BLOCKS.HEADING_6]: (_, children) => (
    <h6 className="text-xl text-text">{children}</h6>
  ),
  [BLOCKS.EMBEDDED_ENTRY]: (_, children) => <div>{children}</div>,
  [BLOCKS.EMBEDDED_RESOURCE]: (_, children) => <div>{children}</div>,
  [BLOCKS.UL_LIST]: (_, children) => (
    <ul className="list-disc pl-8">{children}</ul>
  ),
  [BLOCKS.OL_LIST]: (_, children) => (
    <ol className="list-decimal pl-8">{children}</ol>
  ),
  [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
  [BLOCKS.QUOTE]: (_, children) => <blockquote>{children}</blockquote>,
  [BLOCKS.HR]: () => <Divider />,
  [BLOCKS.TABLE]: (_, children) => (
    <table>
      <tbody>{children}</tbody>
    </table>
  ),
  [BLOCKS.TABLE_ROW]: (_, children) => <tr>{children}</tr>,
  [BLOCKS.TABLE_HEADER_CELL]: (_, children) => <th>{children}</th>,
  [BLOCKS.TABLE_CELL]: (_, children) => <td>{children}</td>,
  [BLOCKS.EMBEDDED_ASSET]: (node) => {
    const data = node.data.target as UmaBlogImageAsset;
    if (isContentfulAsset(data)) {
      const { file, description, title } = data.fields;
      const mimeGroup = file.contentType.split("/")[0]; // image / video etc

      switch (mimeGroup) {
        case "image":
          return (
            <ContentfulImage
              showDescription
              className="w-full rounded-xl"
              {...data}
            />
          );
        // TODO: test this, make custom component if necessary
        case "video":
          return (
            <video title={title} aria-description={description} src={file.url}>
              {description}
            </video>
          );
        // TODO: add other asset types, handle them
        default:
          return <p>unknown file type</p>;
      }
    }
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
