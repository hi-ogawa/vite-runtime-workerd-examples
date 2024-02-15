import { rand } from "./utils";

export async function homeLoader() {
  return { data: `Home loader - random value ${rand()}` };
}
