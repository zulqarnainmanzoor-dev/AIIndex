
/**
 * Utility to calculate estimated reading time for content.
 * Average reading speed is ~200-250 words per minute.
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 225;
  const noOfWords = content.split(/\s+/).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.max(1, Math.ceil(minutes));
}

/**
 * Formats a date to a standard readable "Last Updated" format.
 */
export function formatLastUpdated(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
