"use client";

import React, { createContext, useContext } from 'react';

const NotionConfigContext = createContext(null);

export function NotionConfigProvider({ children, config }) {
  return (
    <NotionConfigContext.Provider value={config}>
      {children}
    </NotionConfigContext.Provider>
  );
}

export function useNotionConfig() {
  const context = useContext(NotionConfigContext);
  if (!context) {
    // Fallback to environment variables if no provider is found
    return {
      token: process.env.NEXT_PUBLIC_NOTION_TOKEN || process.env.NOTION_TOKEN,
      databaseId: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID
    };
  }
  return context;
}
