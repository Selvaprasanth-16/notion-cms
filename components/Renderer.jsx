"use client";

import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

// Core styles are required
import "react-notion-x/src/styles.css";

// Dynamic imports for heavy components as per reference
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);

const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);

const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  { ssr: false }
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
);

export default function Renderer({ recordMap, mapPageUrl }) {
  if (!recordMap) {
    return null;
  }

  // Default page URL mapping if none provided
  const defaultMapPageUrl = (pageId) => `/cms-blog/${pageId}`;

  return (
    <div className="notion-renderer-wrap">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        mapPageUrl={mapPageUrl || defaultMapPageUrl}
        components={{
          Collection,
          Equation,
          Code,
          Pdf,
          Modal,
        }}
      />
    </div>
  );
}
