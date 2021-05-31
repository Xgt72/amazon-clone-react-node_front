// let timestamp = "2021-05-25T19:21:48.000Z";
let timestamp = "2021-05-25T19:45:47.000Z";
console.log(timestamp);
const date = new Date(timestamp);
let offset = new Date(timestamp).getTimezoneOffset();
date.setMinutes(date.getMinutes() + offset * -1);
console.log(date, offset);
let timestampForMysql = new Date(date).toISOString().slice(0, 19).replace("T", " ");
console.log(timestampForMysql);
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
// const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
console.log(new Date(timestamp).toLocaleString("fr-FR", options));

const dateFromMysql = "2021-05-25T19:12:26.000Z";
console.log(new Date(timestamp).toLocaleString("fr-FR", options));
