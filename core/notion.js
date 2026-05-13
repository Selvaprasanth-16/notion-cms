import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export function createNotionClient(token) {
  return new Client({ auth: token });
}

export function createNotionXClient() {
  return new NotionAPI();
}
