import { getDatabasePages } from "../core/fetch.js";
import Link from "next/link";

export default async function NotionBlog({
  token,
  databaseId,
  hrefPrefix = "/cms-blog",
}) {
  // Server-safe credentials fetching
  const authToken = token || process.env.NOTION_TOKEN;
  const dbId = databaseId || process.env.NOTION_DATABASE_ID;

  const pages = await getDatabasePages({
    token: authToken,
    databaseId: dbId,
  });

  return (
    <div className="notion-blog-list">
      {pages.map((page) => {
        const title =
          page.properties.Name?.title?.[0]?.plain_text || "Untitled";

        return (
          <div key={page.id} style={{ marginBottom: "1rem" }}>
            <Link
              href={`${hrefPrefix}/${page.id}`}
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
