import { runServer } from "../denoServer.ts";
runServer("0.0.0.0:8001", {
  handleGetRequest: async () => {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    return { body: undefined, headers };
  },
});
