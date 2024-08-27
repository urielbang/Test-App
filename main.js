"use strict";

const apiKey = "42079125-1909400cd5615db78c9c2cb93";
const url = "https://pixabay.com/api/?key=";
const mainElement = document.querySelector(".mainPictures");
const input = document.getElementById("seacrhInput");
const buttonSearch = document.querySelector(".seacrhButton");
const formInput = document.getElementById("container-form");
const dialogModal = document.getElementById("dialog");
const dialogCardDetails = document.getElementById("dialog-details");
const dialogButtonClose = document.getElementById("dialog-button");

async function fetchById(imgId) {
  const resFetch = await fetch(`${url}${apiKey}&id=${imgId}`);
  const data = await resFetch.json();

  return data;
}

async function fetchData() {
  try {
    const resFetch = await fetch(`${url}${apiKey}`);
    const data = await resFetch.json();
    console.log(data);

    const dataFetch = data.hits.map((pictureData) => {
      return `<div class="card-picture">
          <img src=${pictureData.previewURL} alt="picture">
          <p>${pictureData.tags}</p>
          <div class="id-hidden">${pictureData.id}</div>
      </div>`;
    });

    mainElement.insertAdjacentHTML("afterbegin", dataFetch.join(" "));

    mainElement.addEventListener("click", function (event) {
      const target = event.target.closest(".card-picture");

      if (target) {
        const imageClickedDetails = fetchById(target.children[2].innerHTML);
        imageClickedDetails.then((data) => {
          console.log(data);
          dialogCardDetails.innerHTML = `<div class="card-dialog">
          <h2>${data.hits[0].user}</h2>
          <img src=${data.hits[0].largeImageURL} alt="picture">
          <p>downloads: ${data.hits[0].downloads}</p> 
          <p>likes: ${data.hits[0].likes}</p>
          <span> image size: ${data.hits[0].imageSize}</span>
          </div>`;
        });
        dialogModal.showModal();
      }
    });
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
    mainElement.addEventListener("click", function (event) {
      const target = event.target.closest(".card-picture");

      if (target) {
        // dialogCardDetails = ``
        console.log(target);

        dialogModal.showModal();
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// onSubmit form
formInput.addEventListener("submit", onClickSearch);

// when click on card pop up modal with details

dialogButtonClose.addEventListener("click", () => {
  dialogModal.close();
});
