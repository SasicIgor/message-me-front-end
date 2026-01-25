import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import {
  ReactQueryDevtoolsPanel,
  ReactQueryDevtools,
} from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import useAuthStore from "./store/useAuthStore";
import { routeTree } from "./routeTree.gen";
import { client } from "./react-query/queryClient";
import { useEffect } from "react";

const router = createRouter({
  routeTree,
  context: { authStore: useAuthStore },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const refresh = useAuthStore((state) => state.refresh);
  const initialRefreshFinished = useAuthStore(
    (state) => state.initialRefreshFinished,
  );
  useEffect(() => {
    if (!initialRefreshFinished) refresh();
  }, []);

  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools />
        <TanStackDevtools
          plugins={[
            formDevtoolsPlugin(),
            { name: "TanStack Query", render: <ReactQueryDevtoolsPanel /> },
          ]}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
