"use client"; // Only works in client components

import { useQueryState } from "nuqs";

export default function NuqsComponent() {
  const [name, setName] = useQueryState("name");
  return (
    <>
      <h1>Hello, {name || "anonymous visitor"}!</h1>
      <input value={name || ""} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setName(null)}>Clear</button>
    </>
  );
}
