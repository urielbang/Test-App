const apiKey = "42079125-1909400cd5615db78c9c2cb93";
const url = "https://pixabay.com/api/?key=";

async function fetchData() {
  try {
    const resFetch = await fetch(`${url}${apiKey}`);
    const data = await resFetch.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchData();
