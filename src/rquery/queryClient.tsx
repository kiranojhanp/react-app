import { QueryClient } from "@tanstack/react-query";

const CustomQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

export default CustomQueryClient;
