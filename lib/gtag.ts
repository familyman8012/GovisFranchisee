declare var gtag: (
  prop: string,
  trackingId: string,
  options: {
    page_path?: string;
  }
) => void;

export const TRACKING_ID = process.env.NODE_ENV === "production" ? "G-3T60DYNJ83" : "G-D8C029W0G1";

export const pageview = (page_path: string) => {
  if (!gtag) return;

  gtag("config", TRACKING_ID, {
    page_path,
  });
};
