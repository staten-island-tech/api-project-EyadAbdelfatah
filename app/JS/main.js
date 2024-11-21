import "/css/style.css";
const DOMSelectors = {
  container: document.querySelector("#container"),
};
let result;
async function getData() {
  try {
    const response = await fetch(
      "https://eldenring.fanapis.com/api/bosses?limit=100"
    );
    result = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getData();
async function makeCards() {
  await getData();

  result.data.forEach((boss) => {
    if (result.data.name == null) {
    }
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="border-solid hover:border-dotted">
         <h3 class="">${boss.name}</h3>
         <img src="${boss.image}" class="" />
       </div>`
    );
  });
}
makeCards();
