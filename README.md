# Notion CMS

A simple React-based CMS library for fetching and rendering Notion content.

## Installation

Since this is a local package in a monorepo-style structure:

```bash
npm install ./packages/notion-cms
```

## Usage

### NotionBlog

```jsx
import { NotionBlog } from 'notion-cms';

function MyBlog() {
  return (
    <NotionBlog 
      token={process.env.NOTION_TOKEN} 
      databaseId={process.env.NOTION_DATABASE_ID} 
    />
  );
}
```

### NotionPage

```jsx
import { NotionPage } from 'notion-cms';

function MyPage({ pageId }) {
  return (
    <NotionPage 
      token={process.env.NOTION_TOKEN} 
      pageId={pageId} 
    />
  );
}
```
