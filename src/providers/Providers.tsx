"use client";
import { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import StoreContextProvider from "./ReduxStoreProvider";

interface Props {
  children: ReactNode;
}
export default function Providers({ children }: Props) {
  return (
    <>
      <ReactQueryProvider>
        <StoreContextProvider>{children}</StoreContextProvider>
      </ReactQueryProvider>
    </>
  );
}
