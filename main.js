"use strict";

const mainElement = document.querySelector(".mainPictures");
const input = document.getElementById("seacrhInput");
const buttonSearch = document.querySelector(".seacrhButton");
const formInput = document.getElementById("container-form");
const dialogModal = document.getElementById("dialog");
const dialogCardDetails = document.getElementById("dialog-details");
const dialogButtonClose = document.getElementById("dialog-button");
const buttonForMore = document.querySelector(".button-37");
const categoriesButtons = document.getElementsByTagName("li");
const URL = "http://localhost:5000/api/v1/pictures";
let pageNumber = 1;

async function fetchById(imgId) {
  const resFetch = await fetch(`${URL}/${imgId}`);
  const data = await resFetch.json();

  return data;
}

async function fetchData() {
  try {
    const resFetch = await fetch(URL);
    const data = await resFetch.json();

    console.log(data);

    const dataFetch = data.hits.map((pictureData) => {
      return `<div class="card-picture">
    <span class="favorite-icon">♥</span>
          <img src=${pictureData.previewURL} alt="picture">
          <p>${pictureData.tags}</p>
          <div class="id-hidden">${pictureData.id}</div>
          <div class="info-overlay">
        <p>
        likes: ${pictureData.likes} views: ${pictureData.views}
        </p>
       </div>
      </div>`;
    });

    mainElement.insertAdjacentHTML("afterbegin", dataFetch.join(" "));

    mainElement.addEventListener("click", function (event) {
      const target = event.target.closest(".card-picture");

      if (target.children[2]?.innerHTML) {
        const imageClickedDetails = fetchById(target.children[3].innerHTML);
        imageClickedDetails.then((data) => {
          console.log(data);
          dialogCardDetails.innerHTML = `<div class="card-dialog">
          <h2>${data.hits[0].user}</h2>
          <img class="dialog-img" src=${data.hits[0].largeImageURL} alt="picture">
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

  try {
    const resFetch = await fetch(`${URL}`);
    const data = await resFetch.json();
    const filteredData = data.hits.filter((picture) => {
      return picture.tags.includes(e.srcElement[0].value);
    });

    const dataElements = filteredData.map((pictureData) => {
      return `<div class="card-picture">
    <span class="favorite-icon">♥</span>
          <img src=${pictureData.previewURL} alt="picture">
          <p>${pictureData.tags}</p>
        <div class="id-hidden">${pictureData.id}</div>
        <div class="info-overlay">
         <p>
        likes: ${pictureData.likes} views: ${pictureData.views}
        </p>
       </div>
      </div>`;
    });
    mainElement.innerHTML = "";
    mainElement.insertAdjacentHTML("afterbegin", dataElements.join(" "));

    mainElement.addEventListener("click", function (event) {
      const target = event.target.closest(".card-picture");

      if (target) {
        console.log(target);

        const imageClickedDetails = fetchById(target.children[3].innerHTML);
        imageClickedDetails.then((data) => {
          console.log(data);
          dialogCardDetails.innerHTML = `<div class="card-dialog">
          <h2>${data.hits[0].user}</h2>
          <img class="dialog-img" src=${data.hits[0].largeImageURL} alt="picture">
          <p>downloads: ${data.hits[0].downloads}</p> 
          <p>likes: ${data.hits[0].likes}</p>
          <span> image size: ${data.hits[0].imageSize}</span>
          </div>`;
        });
        dialogModal.showModal();
      }
    });
  } catch (error) {
    console.dir(error.children[1].innerHTML);
  }
}

// onSubmit form
formInput.addEventListener("submit", onClickSearch);

// when click on card pop up modal with details

dialogButtonClose.addEventListener("click", () => {
  dialogModal.close();
});

async function fetchMorePictures() {
  pageNumber++;
  const resFetch = await fetch(`${URL}/pageNumber/${pageNumber}`);
  const data = await resFetch.json();
  console.log(data);

  mainElement.innerHTML += data.hits.map((pictureData) => {
    return `<div class="card-picture">
    <span class="favorite-icon">♥</span>
        <img src=${pictureData.previewURL} alt="picture">
        <p>${pictureData.tags}</p>
      <div class="id-hidden">${pictureData.id}</div>
      <div class="info-overlay">
    <p>likes: ${pictureData.likes} views: ${pictureData.views}</p>
  </div>
    </div>`;
  });
}

buttonForMore.addEventListener("click", fetchMorePictures);

async function fetchImagesByCategories(categoryName) {
  const resData = await fetch(`${URL}/pageCategory/${categoryName}`);
  const data = await resData.json();
  return data;
}

//! filter categories
for (const element of categoriesButtons) {
  element.addEventListener("click", () => {
    fetchImagesByCategories(element.childNodes[0].data).then((data) => {
      mainElement.innerHTML = data.hits.map((pictureData) => {
        return `<div class="card-picture">
        <span class="favorite-icon">♥</span>
            <img src=${pictureData.previewURL} alt="picture">
            <p>${pictureData.tags}</p>
          <div class="id-hidden">${pictureData.id}</div>
         <div class="info-overlay">
           <p>likes: ${pictureData.likes} views: ${pictureData.views}</p>
          </div>
        </div>`;
      });
    });
  });
}
