export function frenchDate(date) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(date).toLocaleString("fr-FR", options);
}

export function unitedStateDate(date) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
  return new Date(date).toLocaleString("en-US", options);
}
