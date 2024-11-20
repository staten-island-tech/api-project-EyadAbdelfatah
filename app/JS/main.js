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
      `<div class="border-solid border-2 border-sky-500>
         <h3 class="text-xl font-bold text-white mb-2">${boss.name}</h3>
         <img src="${boss.image}" class="w-full h-40 object-cover rounded-lg" />
       </div>`
    );
  });
}
makeCards();
