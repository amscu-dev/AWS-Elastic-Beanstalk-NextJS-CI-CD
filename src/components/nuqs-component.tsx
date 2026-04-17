"use client"; // Only works in client components

import { useQueryState } from "nuqs";

export default function NuqsComponent() {
  const [name, setName] = useQueryState("name");
  return (
    <>
      <h1>Hello, {name ?? "anonymous visitor"}!</h1>
      <input
        onChange={(event) => void setName(event.target.value)}
        value={name ?? ""}
      />
      <button onClick={() => void setName(null)}>Clear</button>
    </>
  );
}
