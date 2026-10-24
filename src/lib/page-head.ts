export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | RentPaddy` }, { name: "description", content: description }, { property: "og:title", content: `${title} | RentPaddy` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}
