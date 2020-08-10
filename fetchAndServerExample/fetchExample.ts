import { runFetch } from "../denoFetch.ts";
const r = await runFetch("http://0.0.0.0:8000/resource.json").catch(err => err);
console.log("response:", r);
