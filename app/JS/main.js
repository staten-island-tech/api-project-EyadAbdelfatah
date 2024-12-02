import "/css/style.css";

const DOMSelectors = {
  container: document.querySelector("#container"),
  buttonContain: document.querySelector("#button-container"),
  buttonHOL: document.querySelector("#HOL"),
  HOLcontainer: document.querySelector("#HOLcontainer"),
  buttons: document.querySelectorAll("button"),
  health: document.querySelector("#question"),
  input: document.querySelector("#search-input"),
  input_button: document.querySelector("#submit")
};
let result, firstCard, secondCard;
async function getData() {
  try {
    const response = await fetch(
      "https://eldenring.fanapis.com/api/bosses?limit=100"
    );
    result = await response.json();
    makeCards(result.data);
  } catch (error) {
    alert("Error fetching data:", error);
  }
}
getData();
function makeCards(arr) {
  arr.forEach(boss => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="border-8 border-blue-950 rounded-md w-full h-96 max-h-full">
      <h3 class="text-2xl text-center text-white">${boss.name}</h3>
      <img src="${boss.image}" class="object-contain  w-full max-h-full" alt="${boss.description}"/>
  </div>`
    );
  });
}
function getCardHTML(card, id) {
  return `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96" data-health="${card.healthPoints}">
            <h3 class="text-2xl text-center text-white">${card.name}</h3>
            <p class="hidden" id="${id}">Health: ${card.healthPoints}</p> 
            <img src="${card.image}" class="object-contain w-96" alt="${card.description}"/>
          </div>`;
}
const buttonsHTML = `  
  <div class="flex justify-center gap-4 mt-4">
    <button id="higher" class="btn btn-primary text-white">Higher</button>
    <button id="lower" class="btn btn-secondary text-white">Lower</button>
  </div>`;
function insertCards(firstCard, secondCard) {
  const firstCardHTML = getCardHTML(firstCard, "first");
  const secondCardHTML = getCardHTML(secondCard, "second");
  DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", firstCardHTML);
  DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", buttonsHTML);
  DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", secondCardHTML);
}
function convertToInt() {
  result.data.forEach(boss => {
    if (
      boss.healthPoints === "???" ||
      boss.healthPoints == NaN ||
      boss.healthPoints === undefined
    ) {
      boss.healthPoints = 0;
    } else {
      const NewHealthPoints = String(boss.healthPoints).replace(/\D/g, "");
      const x = parseInt(NewHealthPoints, 10);
      boss.healthPoints = x;
    }
  });
  const filteredData = result.data.filter(boss => boss.healthPoints !== 0);
  filteredData.forEach(boss => {
    console.log(boss.healthPoints);
  });
  return filteredData;
}
function higherOrLowerSetup() {
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.buttonContain.innerHTML = "";
  DOMSelectors.health.insertAdjacentHTML(
    "beforeend",
    `<div class="align-center"><h2 class="text-white mb-12">Who has more haelth?</h2></div>`
  );
  const newResult = convertToInt();
  const randomnumber = Math.floor(Math.random() * newResult.length);
  const randomnumber2 = Math.floor(Math.random() * newResult.length);
  firstCard = newResult[randomnumber];
  secondCard = newResult[randomnumber2];
  insertCards(firstCard, secondCard);
  higherOrLower(firstCard, secondCard);
}
function higherOrLower(firstCard, secondCard) {
  DOMSelectors.HOLcontainer.addEventListener("click", function(event) {
    let gameOver = false;
    if (!event.target.matches("button")) return;
    if (gameOver) return;
    const newResult = convertToInt();
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
      DOMSelectors.HOLcontainer.insertAdjacentHTML(
        "afterbegin",
        `<button id="back"class="btn btn-secondary">Back</button>`
      );
      gameOver = true;
    }
  });
  document.querySelector("#first").classList.remove("hidden");
  DOMSelectors.HOLcontainer.addEventListener("click", function(event) {
    if (event.target.id === "higher" || event.target.id === "lower") {
      document.querySelector("#first").classList.remove("hidden");
    }
  });
}
async function search() {
  try {
    const search_response = await fetch(
      "https://eldenring.fanapis.com/api/bosses?limit=100"
    );
    let search_result = await search_response.json();
    let user_input = DOMSelectors.input.value.toLowerCase();
    DOMSelectors.input.value = "";
    DOMSelectors.container.innerHTML = "";
    const user__data = search_result.data.filter(boss =>
      boss.name.toLowerCase().startsWith(user_input)
    );
    makeCards(user__data);
  } catch (error) {
    alert("Uwhat the bruh");
  }
}
DOMSelectors.buttonHOL.addEventListener("click", function() {
  higherOrLowerSetup();
});
DOMSelectors.HOLcontainer.addEventListener("click", function(event) {
  if (event.target.id === "back") {
    window.location.reload();
  }
});
DOMSelectors.input_button.addEventListener("click", function() {
  event.preventDefault();
  search();
});
