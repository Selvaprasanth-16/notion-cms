import { getRecordMap } from "../core/fetch.js";
import Renderer from "./Renderer.jsx";

export default async function NotionPage({ pageId, mapPageUrl, token }) {
  // Use provided token or fallback to environment variable
  const authToken = token || process.env.NOTION_TOKEN;

  // Note: getRecordMap implementation uses createNotionXClient which doesn't currently take a token,
  // but we keep the prop for future-proofing or if the underlying client needs it.
  const recordMap = await getRecordMap(pageId);

  return <Renderer recordMap={recordMap} mapPageUrl={mapPageUrl} />;
}
