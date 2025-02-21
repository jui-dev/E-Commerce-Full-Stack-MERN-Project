import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // this portion to scaffold / connect with Backend ( connecting Frontend & Backend) || Proxy server.
  server: {
    // where our backend is running.
    proxy: {
      // the path where our backend is running :/api/
      "/api/": {
        target: "http://localhost:5030", // the actual path with port where our backend is running.
      },
    },
  },
  // that's how a proxy is created with our Frontend and Backend.
  // Frontend will run on one port.
  // Backend will run on another port.
  // but as we have set the proxy we can catch the Backend execution from the Frontend.
  // that means  In our Frontend when we will call the Backend , we do not need to tell the Frontend separately that where our Backend is running.
});
