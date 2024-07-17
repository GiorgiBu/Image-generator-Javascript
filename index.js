const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
const formel = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultEl = document.querySelector(".search-results");
const showMoreButtonEl = document.querySelector("#show-more-button");
let inputData = "";
let page = 1;
async function searchImages() {
    inputData = searchInputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    if (page === 1) {
        searchResultEl.innerHTML = "";
    }
    const results = data.results
    results.map((result) => {
        console.log(result);
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        console.log(image);
        const title = document.createElement("p")
        title.textContent = result.alt_description
        const imagelink = document.createElement("a")
        imagelink.href = result.links.html
        imagelink.target = "_blank"
        imagelink.textContent = result.alt_description
        imageWrapper.appendChild(imagelink)
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(title);
        searchResultEl.appendChild(imageWrapper);
    });
    page++
    if (page > 1) {
        showMoreButtonEl.style.display = "Block"
    }
};

formel.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
    searchImages();
})