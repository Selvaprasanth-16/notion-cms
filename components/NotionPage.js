import React from "react";
import { getRecordMap } from "./fetch.js";
import Renderer from "./Renderer.js";

export default async function NotionPage({
  pageId,
  mapPageUrl,
  token,
  ...props
}) {
  // Use provided token or fallback to environment variable
  const authToken = token || process.env.NOTION_TOKEN;

  try {
    const recordMap = await getRecordMap(pageId, authToken);

    if (!recordMap) {
      return <div>Error: Could not load page content.</div>;
    }

    return (
      <Renderer recordMap={recordMap} mapPageUrl={mapPageUrl} {...props} />
    );
  } catch (error) {
    console.error(`NotionPage Error [${pageId}]:`, error.message);
    return (
      <div className="notion-error">
        <h3>Page Not Found</h3>
        <p>{error.message}</p>
      </div>
    );
  }
}
