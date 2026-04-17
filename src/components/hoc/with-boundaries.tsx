import type { FallbackProps } from "react-error-boundary";

import { ComponentType, ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface WithSuspenseOptions {
  errorComponent: ComponentType<FallbackProps>;
  loadingComponent?: ReactNode;
}

export const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithSuspenseOptions,
) => {
  const { errorComponent: ErrorFallbackComponent, loadingComponent = null } =
    options;

  const WithSuspenseComponent = (properties: P) => {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
        <Suspense fallback={loadingComponent}>
          <WrappedComponent {...properties} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  WithSuspenseComponent.displayName = `withSuspense(${
    (WrappedComponent.displayName ?? WrappedComponent.name) || "Component"
  })`;

  return WithSuspenseComponent;
};
