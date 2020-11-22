const entry = "20-20-20";
const regex = /\d\d[-]\d\d[-]\d\d/g;
const found = entry.match(regex);
const day = Number(entry.slice(0, 2));
const month = entry.slice(3, 5);
console.log(day, month);
console.log(found);
