import "/css/style.css";


async function getData() {
  try {
    const response = await fetch("https://eldenring.fanapis.com/api/bosses?limit=100"); 
    const result = await response.json(); 

    const filteredBosses = result.data.filter(boss => boss.name.startsWith("M")).forEach(boss => {
      console.log(boss.name)
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getData();
function CreateCards(arr) {
  clear()
  arr.forEach((game) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeEnd",
      `<div class="card">
        <h3>${game.name}</h3>
        <img src="${game.img}" alt="">
        <h3 class="card-price"></h3>
        <h3 class="card-rating">Rating: </h3>
      </div>`
    )
  );
}
CreateCards(result);
