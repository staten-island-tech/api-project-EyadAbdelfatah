import "/css/style.css";
const DOMSelectors = {
  container: document.querySelector("#container"),
  buttonContain: document.querySelector("#button-container"),
  buttonHOL: document.querySelector("#HOL"),
  HOLcontainer: document.querySelector("#HOLcontainer"),
  buttons: document.querySelectorAll("button"),
  dropDown: document.querySelector(".dropdown")
};

let result;
let firstCard, secondCard, HOLbuttons;

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
  </div>`
    );
  });
}

makeCards();

function filterHealth(data) {
  return data.filter(boss => {
    const healthPoints = convertToInt(boss.healthPoints);
    return healthPoints !== 0;
  });
}

function convertToInt(string) {
  if (string === "???" || !string) {
    return 0;
  }
  return parseInt(string.replace(/[^\d]/g, ""), 10);
}

function higherOrLowerSetup() {
  DOMSelectors.HOLcontainer.innerHTML = "";
  DOMSelectors.container.innerHTML = "";

  const newResult = filterHealth(result.data);

  const randomnumber = Math.floor(Math.random() * newResult.length);
  const randomnumber2 = Math.floor(Math.random() * newResult.length);

  firstCard = newResult[randomnumber];
  secondCard = newResult[randomnumber2];

  HOLbuttons = `  
  <div class="flex justify-center gap-4 mt-4">
    <button id="higher" class="btn btn-primary">Higher</button>
    <button id="lower" class="btn btn-secondary">Lower</button>
  </div>`;

  DOMSelectors.HOLcontainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96">
      <h3 class="text-2xl text-center">${firstCard.name}</h3>
      <img src="${firstCard.image}" class="w-full max-h-full" alt="${firstCard.description}"/>
    </div>`
  );

  DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", HOLbuttons);

  DOMSelectors.HOLcontainer.insertAdjacentHTML(
    "beforeend",
    `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96">
      <h3 class="text-2xl text-center">${secondCard.name}</h3>
      <img src="${secondCard.image}" class="w-full max-h-full" alt="${secondCard.description}"/>
    </div>`
  );

  higherOrLower();
}

function higherOrLower() {
  DOMSelectors.HOLcontainer.addEventListener("click", function(event) {
    const newResult = filterHealth(result.data);
    DOMSelectors.HOLcontainer.innerHTML = "";

    let randomNew = Math.floor(Math.random() * newResult.length);
    let newCard = newResult[randomNew];

    const firstCardHealth = convertToInt(firstCard.healthPoints);
    const secondCardHealth = convertToInt(secondCard.healthPoints);

    const secondCardHTML = `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96">
            <h3 class="text-2xl text-center">${secondCard.name}</h3>
            <img src="${secondCard.image}" class="w-full max-h-full" alt="${secondCard.description}"/>
          </div>`;
    const newCardHTML = `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96">
            <h3 class="text-2xl text-center">${newCard.name}</h3>
            <img src="${newCard.image}" class="w-full max-h-full" alt="${newCard.description}"/>
          </div>`;
    console.log();
    if (event.target.id === "higher") {
      if (firstCardHealth >= secondCardHealth) {
        DOMSelectors.HOLcontainer.insertAdjacentHTML(
          "beforeend",
          secondCardHTML
        );
        DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", HOLbuttons);
        DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", newCardHTML);
      }
    } else if (event.target.id === "lower") {
      if (firstCardHealth <= secondCardHealth) {
        DOMSelectors.HOLcontainer.insertAdjacentHTML(
          "beforeend",
          secondCardHTML
        );
        DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", HOLbuttons);
        DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", newCardHTML);
      }
    }
  });
}

DOMSelectors.buttonHOL.addEventListener("click", function() {
  higherOrLowerSetup();
});
