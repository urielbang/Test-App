const apiKey = "42079125-1909400cd5615db78c9c2cb93";
const url = "https://pixabay.com/api/?key=";
const mainElement = document.querySelector(".mainPictures");
const input = document.getElementById("seacrhInput");

async function fetchData() {
  try {
    const resFetch = await fetch(`${url}${apiKey}`);
    const data = await resFetch.json();

    console.log(data);

    const dataFetch = data.hits.map((pictureData) => {
      return `<div class="card-picture">
          <img src=${pictureData.previewURL} alt="picture">
          <p>${pictureData.tags}</p>
      </div>`;
    });

    mainElement.insertAdjacentHTML("afterbegin", dataFetch.join(" "));
  } catch (error) {
    console.log(error);
  }
}

fetchData();

input.addEventListener("change", (e) => {
  console.log(e.target.value);
});
