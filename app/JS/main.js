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

function convertToInt() {
  result.data.forEach(boss => {
    if (boss.healthPoints === "???" || !boss.healthPoints) {
      boss.healthPoints = 0;
    } else {
      const NewHealthPoints = String(boss.healthPoints).replace(/\D/g, "");
      const x = parseInt(NewHealthPoints, 10);
      boss.healthPoints = x;
    }
  });
  const filteredData = result.data.filter(boss => boss.healthPoints !== 0);

  return filteredData;
}

function higherOrLowerSetup() {
  DOMSelectors.HOLcontainer.innerHTML = "";
  DOMSelectors.container.innerHTML = "";
  convertToInt();
  const newResult = convertToInt();

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
    `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96" data-health="${firstCard.healthPoints}">
      <h3 class="text-2xl text-center">${firstCard.name}</h3>
      <img src="${firstCard.image}" class="w-full max-h-full" alt="${firstCard.description}"/>
    </div>`
  );

  DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", HOLbuttons);

  DOMSelectors.HOLcontainer.insertAdjacentHTML(
    "beforeend",
    `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96" data-health="${secondCard.healthPoints}">
      <h3 class="text-2xl text-center">${secondCard.name}</h3>
      <img src="${secondCard.image}" class="w-full max-h-full" alt="${secondCard.description}"/>
    </div>`
  );

  higherOrLower(firstCard, secondCard);
}

function higherOrLower(firstCard, secondCard) {
  DOMSelectors.HOLcontainer.addEventListener("click", function(event) {
    let gameOver;
    if (gameOver) return;
    const newResult = convertToInt();
    DOMSelectors.HOLcontainer.innerHTML = "";

    let randomNew = Math.floor(Math.random() * newResult.length);
    let newCard = newResult[randomNew];

    console.log("First card health:", firstCard.healthPoints, firstCard.name);
    console.log(
      "Second card health:",
      secondCard.healthPoints,
      secondCard.name
    );

    const secondCardHTML = `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96">
            <h3 class="text-2xl text-center">${secondCard.name}</h3>
            <img src="${secondCard.image}" class="w-full max-h-full" alt="${secondCard.description}"/>
          </div>`;
    const newCardHTML = `<div class="border-8 border-blue-950 rounded-md w-96 mb-12 h-96">
            <h3 class="text-2xl text-center">${newCard.name}</h3>
            <img src="${newCard.image}" class="w-full max-h-full" alt="${newCard.description}"/>
          </div>`;

    if (event.target.id === "higher") {
      if (firstCard.healthPoints >= secondCard.healthPoints) {
        DOMSelectors.HOLcontainer.insertAdjacentHTML(
          "beforeend",
          secondCardHTML
        );
        DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", HOLbuttons);
        DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", newCardHTML);
        firstCard = secondCard;
        secondCard = newCard;
      } else {
        console.log("you lose!");
      }
    } else if (event.target.id === "lower") {
      if (firstCard.healthPoints <= secondCard.healthPoints) {
        DOMSelectors.HOLcontainer.insertAdjacentHTML(
          "beforeend",
          secondCardHTML
        );
        DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", HOLbuttons);
        DOMSelectors.HOLcontainer.insertAdjacentHTML("beforeend", newCardHTML);
        firstCard = secondCard;
        secondCard = newCard;
      } else {
        console.log("you lose!");
      }
    }
  });
}

DOMSelectors.buttonHOL.addEventListener("click", function() {
  higherOrLowerSetup();
});
