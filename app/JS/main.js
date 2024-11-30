import "/css/style.css";
const DOMSelectors = {
  container: document.querySelector("#container"),
  buttonContain: document.querySelector("#button-container"),
  buttonHOL: document.querySelector("#HOL"),
  HOLcontainer: document.querySelector("#HOLcontainer")
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
  result.data.forEach(boss => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="border-8 border-blue-950 rounded-md w-full h-96 max-h-full">
      <h3 class="text-2xl text-center">${boss.name}</h3>
      <img src="${boss.image}" class="object-contain  w-full max-h-full" alt="${boss.description}"/>
  </div>
  `
    );
  });
}
makeCards();

function higherOrLower() {
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.buttonContain.innerHTML = "";
  let randomNumber = Math.floor(Math.random() * result.data.length);
  let randomNumber2 = Math.floor(Math.random() * result.data.length);
  let boss;
  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      boss = result.data[randomNumber];
    } else {
      boss = result.data[randomNumber2];
    }
    DOMSelectors.HOLcontainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96">
      <h3 class="text-2xl text-center">${boss.name}</h3>
      <img src="${boss.image}" class="object-contain  w-full max-h-full" alt="${boss.description}"/>
  </div>
  `
    );
    if (i == 0) {
      DOMSelectors.HOLcontainer.insertAdjacentHTML(
        "afterbegin",
        `<div class="flex justify-center gap-4 mb-12">
    <button id="higher" class="btn btn-outline" >Higher</button>
    <button id="lower" class="btn btn-outline" >Lower</button>
  </div>`
      );
    }
  }
}
DOMSelectors.buttonHOL.addEventListener("click", function() {
  higherOrLower();
});
