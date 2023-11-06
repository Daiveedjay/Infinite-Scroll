"use strict";

const productsList = document.querySelector(".products__list");
const loadingIndicator = document.querySelector(".loading-indicator");

window.addEventListener("scroll", () => {
  if (
    !isFetching &&
    window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 100
  ) {
    // User is near the bottom, fetch more content
    fetchMoreContent();
  }
});

let isFetching = false;

async function fetchMoreContent() {
  if (isFetching) return; // Exit if already fetching

  isFetching = true; // Set the flag to true
  showLoadingIndicator();

  try {
    let response = await fetch("https://fakestoreapi.com/products?limit=3");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    console.log(data);
    displayNewContent(data);
  } catch (error) {
    console.error("There was a problem fetching new content:", error);
  } finally {
    console.log("Fetch function fired");
    hideLoadingIndicator();
    isFetching = false; // Reset the flag to false
  }
}

function displayNewContent(data) {
  data.forEach((item) => {
    const imgElement = document.createElement("img");
    imgElement.src = item.image;
    imgElement.alt = item.title;

    productsList.appendChild(imgElement); // Append to productsList instead of productsContainer
  });
}

function showLoadingIndicator() {
  loadingIndicator.style.display = "block";
  console.log("Loading...");
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = "none";
  console.log("Finished loading.");
}
