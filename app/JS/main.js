import "./style.css";

const data = await fetch("https://eldenring.fanapis.com/api/items?limit=100");
console.log(data);
