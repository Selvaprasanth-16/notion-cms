import { createNotionClient, createNotionXClient } from "./notion";

export async function getDatabasePages({ token, databaseId }) {
  const notion = createNotionClient(token);

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
}

export async function getPage({ token, pageId }) {
  const notion = createNotionClient(token);

  const response = await notion.blocks.children.list({
    block_id: pageId,
  });

  return response.results;
}

export async function getRecordMap(pageId) {
  const notionX = createNotionXClient();
  return notionX.getPage(pageId);
}
