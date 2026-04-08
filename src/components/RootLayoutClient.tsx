"use client";

import ChatBot from "./ChatBot";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
}
