const accessKey = "3E9s8BL4z8vynA87Qu93CD5U38-0bDTOFhc_zbm06CU";


const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;


let searchImages = async function () {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const results = data.results;
  
      if (page === 1) {
        searchResults.innerHTML = "";
      }
  
      results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
  
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
      });
  
      page++;
      if (page > 1) {
        showMore.style.display = "block";
      }
    } catch (error) {
      console.log(error);
    }
  };
  

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
