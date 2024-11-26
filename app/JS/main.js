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
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="border-8 border-blue-950 rounded-md w-96 h-96 max-w-full max-h-full">
      <h3 class="text-2xl text-center">${boss.name}</h3>
      <img src="${boss.image}" class="object-contain h-96 w-96 max-h-96" alt="${boss.description}"/>
  </div>
  `
    );
  });
}
makeCards();
