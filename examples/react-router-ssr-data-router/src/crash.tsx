export async function crashLoader() {
  f1();
}

function f1() {
  f2();
}

function f2() {
  throw new Error("crash!!!");
}
