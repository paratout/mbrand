/**
 * Converts a TipTap JSON document to safe HTML for public display.
 * This is intentionally minimal — it only renders the node types
 * we actually use (StarterKit + Image + Link).
 */
export function tiptapToHtml(doc: Record<string, unknown> | null | undefined): string {
  if (!doc || doc['type'] !== 'doc') return '';
  return renderNodes(doc['content'] as TipTapNode[] | undefined);
}

interface TipTapNode {
  type: string;
  text?: string;
  content?: TipTapNode[];
  marks?: TipTapMark[];
  attrs?: Record<string, unknown>;
}

interface TipTapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

function renderNodes(nodes: TipTapNode[] | undefined): string {
  if (!nodes) return '';
  return nodes.map(renderNode).join('');
}

function escape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyMarks(text: string, marks: TipTapMark[] | undefined): string {
  if (!marks) return text;
  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case 'bold':      return `<strong>${acc}</strong>`;
      case 'italic':    return `<em>${acc}</em>`;
      case 'strike':    return `<s>${acc}</s>`;
      case 'code':      return `<code>${acc}</code>`;
      case 'link': {
        const href = escape(String(mark.attrs?.['href'] ?? ''));
        const rel  = 'noopener noreferrer';
        return `<a href="${href}" target="_blank" rel="${rel}">${acc}</a>`;
      }
      default: return acc;
    }
  }, text);
}

function renderNode(node: TipTapNode): string {
  switch (node.type) {
    case 'text':
      return applyMarks(escape(node.text ?? ''), node.marks);

    case 'paragraph':
      return `<p>${renderNodes(node.content)}</p>`;

    case 'heading': {
      const level = Number(node.attrs?.['level'] ?? 2);
      return `<h${level}>${renderNodes(node.content)}</h${level}>`;
    }

    case 'bulletList':
      return `<ul>${renderNodes(node.content)}</ul>`;

    case 'orderedList':
      return `<ol>${renderNodes(node.content)}</ol>`;

    case 'listItem':
      return `<li>${renderNodes(node.content)}</li>`;

    case 'blockquote':
      return `<blockquote>${renderNodes(node.content)}</blockquote>`;

    case 'codeBlock': {
      const lang = escape(String(node.attrs?.['language'] ?? ''));
      return `<pre${lang ? ` data-language="${lang}"` : ''}><code>${renderNodes(node.content)}</code></pre>`;
    }

    case 'horizontalRule':
      return `<hr>`;

    case 'hardBreak':
      return `<br>`;

    case 'image': {
      const src = escape(String(node.attrs?.['src'] ?? ''));
      const alt = escape(String(node.attrs?.['alt'] ?? ''));
      return `<img src="${src}" alt="${alt}" loading="lazy">`;
    }

    default:
      // Unknown nodes — render children if any
      return renderNodes(node.content);
  }
}
