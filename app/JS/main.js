import "/css/style.css";

const DOMSelectors = {
  container: document.querySelector("#container"),
  buttonContain: document.querySelector("#button-container"),
  buttonHOL: document.querySelector("#HOL"),
  HOLcontainer: document.querySelector("#HOLcontainer"),
  buttons: document.querySelectorAll("button")
};
let result, firstCard, secondCard, HOLbuttons;

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
function getCardHTML(card) {
  return `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96" data-health="${card.healthPoints}">
            <h3 class="text-2xl text-center">${card.name}</h3>
            <img src="${card.image}" class="object-contain w-96" alt="${card.description}"/>
          </div>`;
}
const buttonsHTML = `  
  <div class="flex justify-center gap-4 mt-4">
    <button id="higher" class="btn btn-primary">Higher</button>
    <button id="lower" class="btn btn-secondary">Lower</button>
  </div>`;
function insertCards(firstCard, secondCard) {
  const firstCardHTML = getCardHTML(firstCard);
  const secondCardHTML = getCardHTML(secondCard);

  DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", firstCardHTML);
  DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", buttonsHTML);
  DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", secondCardHTML);
}
async function convertToInt() {
  try {
    const responses = await fetch(
      "https://eldenring.fanapis.com/api/bosses?limit=100"
    );
    const results = await responses.json();
    console.log(results);

    results.data.forEach(boss => {
      if (boss.healthPoints === "???" || !boss.healthPoints) {
        boss.healthPoints = 0;
      } else {
        const NewHealthPoints = String(boss.healthPoints).replace(/\D/g, "");
        const x = parseInt(NewHealthPoints, 10);
        boss.healthPoints = x;
      }
    });

    const filteredData = results.data.filter(boss => boss.healthPoints !== 0);
    return filteredData;
  } catch (error) {}
}

async function higherOrLowerSetup() {
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.buttonContain.innerHTML = "";

  const newResult = await convertToInt();

  const randomnumber = Math.floor(Math.random() * newResult.length);
  const randomnumber2 = Math.floor(Math.random() * newResult.length);

  firstCard = newResult[randomnumber];
  secondCard = newResult[randomnumber2];

  insertCards(firstCard, secondCard);

  higherOrLower(firstCard, secondCard);
}

async function higherOrLower(firstCard, secondCard) {
  DOMSelectors.HOLcontainer.addEventListener("click", async function(event) {
    let gameOver = false;
    if (!event.target.matches("button")) return;

    if (gameOver) return;
    const newResult = await convertToInt();
    DOMSelectors.HOLcontainer.innerHTML = "";

    let randomNew = Math.floor(Math.random() * newResult.length);
    let newCard = newResult[randomNew];

    if (
      (event.target.id === "higher" &&
        firstCard.healthPoints >= secondCard.healthPoints) ||
      (event.target.id === "lower" &&
        firstCard.healthPoints <= secondCard.healthPoints)
    ) {
      firstCard = secondCard;
      secondCard = newCard;
      insertCards(firstCard, secondCard);
    } else {
      gameOver = true;
    }
  });
}

DOMSelectors.buttonHOL.addEventListener("click", function() {
  higherOrLowerSetup();
});
