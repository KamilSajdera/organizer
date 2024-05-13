"use client";

import ErrorBoundary from "@/ui/ErrorBoundary";

export default function Error({ error }) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>An error occured!</h2>
      <ErrorBoundary>{error.toString()}</ErrorBoundary>
    </>
  );
}
