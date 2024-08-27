const apiKey = "42079125-1909400cd5615db78c9c2cb93";
const url = "https://pixabay.com/api/?key=";
const mainElement = document.querySelector(".mainPictures");
const input = document.getElementById("seacrhInput");
const buttonSearch = document.querySelector(".seacrhButton");
const formInput = document.getElementById("container-form");

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

async function onClickSearch(e) {
  e.preventDefault();
  console.dir(e.srcElement[0].value);

  try {
    const resFetch = await fetch(`${url}${apiKey}`);
    const data = await resFetch.json();
    const filteredData = data.hits.filter((picture) => {
      return picture.tags.includes(e.srcElement[0].value);
    });

    const dataElements = filteredData.map((pictureData) => {
      return `<div class="card-picture">
          <img src=${pictureData.previewURL} alt="picture">
          <p>${pictureData.tags}</p>
      </div>`;
    });

    mainElement.innerHTML = dataElements;
  } catch (error) {
    console.log(error);
  }
}

formInput.addEventListener("submit", onClickSearch);
