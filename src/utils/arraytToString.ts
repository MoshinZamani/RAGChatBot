export function arrayToString(arr) {
  return arr.map((element) => element.pageContent).join("\n\n\n");
}
