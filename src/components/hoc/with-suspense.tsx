import { ComponentType, ReactNode, Suspense } from "react";

interface WithSuspenseOptions {
  loadingComponent?: ReactNode;
}

export const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: WithSuspenseOptions,
) => {
  const { loadingComponent = null } = options ?? {};

  const WithSuspenseComponent = (properties: P) => {
    return (
      <Suspense fallback={loadingComponent}>
        <WrappedComponent {...properties} />
      </Suspense>
    );
  };

  WithSuspenseComponent.displayName = `withSuspense(${
    (WrappedComponent.displayName ?? WrappedComponent.name) || "Component"
  })`;

  return WithSuspenseComponent;
};
