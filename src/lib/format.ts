export const naira = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

export const shortNaira = (n: number) => {
  if (n >= 1_000_000) return "₦" + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "m";
  if (n >= 1_000) return "₦" + Math.round(n / 1_000) + "k";
  return naira(n);
};

export const niceDate = (iso: string) =>
  new Date(iso + (iso.length === 10 ? "T12:00:00" : "")).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
