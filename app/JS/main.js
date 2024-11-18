import "/css/style.css";
const DOMSelectors = {
  container: document.querySelector(".container")
}
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
async function makeCards(array){
  await getData();
  array.forEach(boss => {
    DOMSelectors.container.insertAdjacentHTML("beforeend",`<h3>${boss.name}</h3>`)
  });
}
makeCards(result);
