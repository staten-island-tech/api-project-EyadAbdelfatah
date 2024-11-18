import "/css/style.css";

async function getData() {
  try {
    const response = await fetch(
      "https://eldenring.fanapis.com/api/bosses?limit=100"
    );
    const result = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData();
console.log(result);
