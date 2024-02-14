import { useLoaderData } from "react-router-dom";
import type { homeLoader } from "./home.loader";

export function Home() {
  let data = useLoaderData() as Awaited<ReturnType<typeof homeLoader>>;
  return (
    <div>
      <h2>Home</h2>
      <p>Loader Data: {data.data}</p>
    </div>
  );
}
