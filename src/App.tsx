import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import useAuthStore from "./store/useAuthStore";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: { authStore: useAuthStore },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const client = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router}></RouterProvider>
        <TanStackDevtools
          plugins={[
            formDevtoolsPlugin(),
            { name: "TanStack Query", render: <ReactQueryDevtoolsPanel /> },
          ]}
        />
      </QueryClientProvider>
      <TanStackRouterDevtools router={router} />
    </>
  );
}

export default App;
