# `@selvaprasanth/notion-cms`

A lightweight Notion-powered CMS toolkit for **React** and **Next.js**. It wraps the official Notion API for database queries and uses `notion-client` + `react-notion-x` to render Notion pages with high fidelity (collections, code blocks, equations, PDFs, and more).

This package is designed to be:
- **Framework-friendly**: Works in React apps and in Next.js (including App Router).
- **Pragmatic**: Provides a couple of ready-made components (`NotionBlog`, `NotionPage`) plus small fetch utilities you can compose yourself.
- **Token-aware**: Encourages server-side token usage while still supporting client usage when you explicitly opt in.

## Table of contents

- [Features](#features)
- [What you need](#what-you-need)
- [Install](#install)
- [Quick start (Next.js App Router)](#quick-start-nextjs-app-router)
- [Quick start (React / Vite)](#quick-start-react--vite)
- [API reference](#api-reference)
- [Styling](#styling)
- [Security notes](#security-notes)
- [Troubleshooting](#troubleshooting)
- [Development (package repo)](#development-package-repo)
- [License](#license)

## Features

- **Two usage styles**: Use the included components, or build your own UI with the fetch helpers.
- **Notion page rendering**: Uses `react-notion-x` with lazy-loaded third-party blocks (collection, equation, code, pdf, modal).
- **Database listing**: Query a Notion database and render a simple list of pages.
- **Custom routing**: Map internal Notion links to your app routes via `mapPageUrl`.
- **Simple styling hook**: Includes a CSS export you can import and customize.

## What you need

- A Notion **integration token** (Internal Integration Secret).
- A Notion **database ID** (for listing) and/or **page ID** (for rendering).
- The integration must be shared with the target database/page in Notion.

Recommended versions:
- `react` >= 18
- `next` >= 13 (for `NotionBlog` and for server-first usage)

## Install

### Production

```bash
npm install @selvaprasanth/notion-cms
```

### Local development (monorepo / sibling folder)

```bash
npm install ../notion-cms
```

## Quick start (Next.js App Router)

### 1) Environment variables

Create a `.env.local`:

```bash
NOTION_TOKEN=secret_xxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2) Blog list route (Server Component)

```jsx
import { NotionBlog } from "@selvaprasanth/notion-cms";

export default async function BlogListPage() {
  return (
    <NotionBlog
      token={process.env.NOTION_TOKEN}
      databaseId={process.env.NOTION_DATABASE_ID}
      hrefPrefix="/cms-blog"
    />
  );
}
```

`NotionBlog` uses `next/link` internally, so it is intended for **Next.js**.

### 3) Page route (Server Component)

```jsx
import { NotionPage } from "@selvaprasanth/notion-cms";

export default async function PostPage({ params }) {
  const { id } = await params;
  return <NotionPage pageId={id} token={process.env.NOTION_TOKEN} />;
}
```

### 4) Custom page URL mapping (recommended)

If your pages live at a different route, map internal Notion links to your route structure:

```jsx
<NotionPage
  pageId={id}
  token={process.env.NOTION_TOKEN}
  mapPageUrl={(pageId) => `/posts/${pageId}`}
/>
```

## Quick start (React / Vite)

In a standard React app you typically:
1) fetch the page record map (`getRecordMap`)
2) render it with the provided `Renderer` component

```jsx
import React, { useEffect, useState } from "react";
import { getRecordMap, Renderer } from "@selvaprasanth/notion-cms";

export default function NotionPageClient({ pageId }) {
  const [recordMap, setRecordMap] = useState(null);

  useEffect(() => {
    getRecordMap(pageId, "your_notion_token").then(setRecordMap);
  }, [pageId]);

  return <Renderer recordMap={recordMap} mapPageUrl={(id) => `/posts/${id}`} />;
}
```

To list pages from a database:

```jsx
import React, { useEffect, useState } from "react";
import { getDatabasePages } from "@selvaprasanth/notion-cms";

export default function BlogListClient() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getDatabasePages({ token: "your_notion_token", databaseId: "your_db_id" }).then(setPages);
  }, []);

  return (
    <div>
      {pages.map((page) => {
        const title = page.properties?.Name?.title?.[0]?.plain_text ?? "Untitled";
        return <div key={page.id}>{title}</div>;
      })}
    </div>
  );
}
```

## API reference

### Components

#### `NotionPage(props)`

Server-friendly component that fetches a Notion page record map and renders it.

Props:
- `pageId` (required): Notion page ID.
- `token` (optional): Notion integration token. Falls back to `process.env.NOTION_TOKEN`.
- `mapPageUrl` (optional): `(pageId: string) => string` to map internal Notion links.
- Any additional props are forwarded to `react-notion-x`’s `NotionRenderer`.

#### `NotionBlog(props)`

Server-friendly component that queries a database and renders a basic linked list (via `next/link`).

Props:
- `token` (optional): Falls back to `process.env.NOTION_TOKEN`.
- `databaseId` (optional): Falls back to `process.env.NOTION_DATABASE_ID`.
- `hrefPrefix` (optional): Prefix for detail routes (default: `/cms-blog`).

#### `Renderer(props)`

Client component wrapper around `react-notion-x`’s `NotionRenderer` with lazy-loaded blocks.

Props:
- `recordMap` (required): Record map returned by `getRecordMap`.
- `mapPageUrl` (optional): Defaults to `(id) => \`/cms-blog/\${id}\``.
- `components` (optional): Override/extend `react-notion-x` component slots.
- Any additional props are forwarded to `NotionRenderer`.

### Fetch helpers

#### `getDatabasePages({ token, databaseId })`

Queries a Notion database using `@notionhq/client` and returns `response.results`.

#### `getPage({ token, pageId })`

Fetches child blocks for a block/page via `notion.blocks.children.list` and returns `response.results`.

#### `getRecordMap(pageId, token)`

Fetches the full record map used by `react-notion-x` via `notion-client`.

### Notion clients

- `createNotionClient(token)` creates an `@notionhq/client` instance.
- `createNotionXClient(token)` creates a `notion-client` `NotionAPI` instance.

### Config context (optional)

For client-side usage, you can provide a config via context:

- `NotionConfigProvider({ config, children })`
- `useNotionConfig()`

If no provider is present, `useNotionConfig()` falls back to:
- `NEXT_PUBLIC_NOTION_TOKEN` or `NOTION_TOKEN`
- `NEXT_PUBLIC_NOTION_DATABASE_ID` or `NOTION_DATABASE_ID`

## Styling

This package exports a CSS file you can import:

```js
import "@selvaprasanth/notion-cms/styles";
```

`Renderer` also imports the base `react-notion-x` styles automatically.

## Security notes

- Prefer using your Notion token **only on the server** (Next.js Server Components, API routes, or server functions).
- If you put a token into `NEXT_PUBLIC_*`, it will be exposed to the browser. Only do this with a token that you are comfortable exposing.
- Always restrict sharing inside Notion to only the pages/databases your integration needs.

## Troubleshooting

- **Empty database results**: Confirm the integration is shared with the database and the database ID is correct.
- **“Page Not Found”**: Ensure the page is shared with the integration and you are passing the correct page ID.
- **Broken internal links**: Provide `mapPageUrl` so Notion links resolve to your routes.

## Development (package repo)

```bash
npm install
npm run build
```

The build output is written to `dist/` using Babel.

## License

MIT
