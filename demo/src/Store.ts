import Page from "@daybrush/page";

export const manager = new Page.s({
  events: ["resize", "scroll"],
});
export const pages: Page[] = [];
export function add(page: Page) {
  pages.push(page);
  manager.add(page);
}
export function scroll() {
  manager.scroll();
}
