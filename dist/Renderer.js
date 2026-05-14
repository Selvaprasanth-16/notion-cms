"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { lazy, Suspense } from "react";
import { NotionRenderer } from "react-notion-x";

// Core styles
import "react-notion-x/src/styles.css";

// Lazy-loaded third-party components
const Collection = /*#__PURE__*/lazy(() => import("react-notion-x/build/third-party/collection").then(m => ({
  default: m.Collection
})));
const Equation = /*#__PURE__*/lazy(() => import("react-notion-x/build/third-party/equation").then(m => ({
  default: m.Equation
})));
const Code = /*#__PURE__*/lazy(() => import("react-notion-x/build/third-party/code").then(m => ({
  default: m.Code
})));
const Pdf = /*#__PURE__*/lazy(() => import("react-notion-x/build/third-party/pdf").then(m => ({
  default: m.Pdf
})));
const Modal = /*#__PURE__*/lazy(() => import("react-notion-x/build/third-party/modal").then(m => ({
  default: m.Modal
})));
export default function Renderer({
  recordMap,
  mapPageUrl,
  components,
  ...props
}) {
  if (!recordMap) {
    return null;
  }

  // Default page URL mapping if none provided
  const defaultMapPageUrl = pageId => `/cms-blog/${pageId}`;
  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", null, "Loading...")
  }, /*#__PURE__*/React.createElement("div", {
    className: "notion-renderer-wrap"
  }, /*#__PURE__*/React.createElement(NotionRenderer, _extends({
    recordMap: recordMap,
    fullPage: false,
    darkMode: false,
    mapPageUrl: mapPageUrl || defaultMapPageUrl
  }, props, {
    components: {
      Collection,
      Equation,
      Code,
      Pdf,
      Modal,
      ...components
    }
  }))));
}