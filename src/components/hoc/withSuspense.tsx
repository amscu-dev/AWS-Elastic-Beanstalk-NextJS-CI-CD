import { ComponentType, ReactNode, Suspense } from "react";

type withSuspenseOptions = {
  loadingComponent?: ReactNode;
};

export const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: withSuspenseOptions,
) => {
  const { loadingComponent = null } = options ?? {};

  const WithSuspenseComponent = (props: P) => {
    return (
      <Suspense fallback={loadingComponent}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  WithSuspenseComponent.displayName = `withSuspense(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithSuspenseComponent;
};
