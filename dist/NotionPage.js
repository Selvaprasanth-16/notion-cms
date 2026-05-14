function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
      return /*#__PURE__*/React.createElement("div", null, "Error: Could not load page content.");
    }
    return /*#__PURE__*/React.createElement(Renderer, _extends({
      recordMap: recordMap,
      mapPageUrl: mapPageUrl
    }, props));
  } catch (error) {
    console.error(`NotionPage Error [${pageId}]:`, error.message);
    return /*#__PURE__*/React.createElement("div", {
      className: "notion-error"
    }, /*#__PURE__*/React.createElement("h3", null, "Page Not Found"), /*#__PURE__*/React.createElement("p", null, error.message));
  }
}