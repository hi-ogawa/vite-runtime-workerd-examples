import { rand, sleep } from "./utils";

export async function homeLoader() {
  await sleep();
  return { data: `Home loader - random value ${rand()}` };
}
