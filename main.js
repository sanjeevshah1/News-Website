const apiKEY =  import.meta.env.VITE_API_KEY;
const blogContainer = document.querySelector("#blog-container");
const resultContainer = document.querySelector(".result");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", displaySearchBlog);
async function displaySearchBlog() {
  displaySearch(searchInput.value);
  articles = await fetchSearch();
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    blogElement = document.createElement("div");
    blogElement.classList.add("blog-card");
    blogElement.innerHTML = `
      <img src = ${article.urlToImage} alt = ${article.title}/>
      <h2>${article.title}</h2>
      <p>${article.description}</p>
        `;
    blogElement.addEventListener("click", () => {
      // Open the URL in a new tab
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogElement);
  });
}
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    displaySearchBlog();
  }
});


async function fetchSearch() {
  try {
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      const apiURL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        searchQuery
      )}&apiKey=${apiKEY}&pageSize=12`;
      // Proceed with the API request
      const response = await fetch(apiURL);
      const data = await response.json();
      console.log(data);
      return data.articles;
    } else {
      // Display an error message or handle the case where no search query is entered
      console.log("error");
    }
  } catch (error) {
    console.log("there's an error", error);
  }
}
async function fetchRandom() {
  try {
    const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKEY}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.log("Error Fetching the random news", error);
    return [];
  }
}

(async () => {
  try {
    const articles = await fetchRandom();
    displayBlog(articles);
    displaySearch("random");
  } catch (error) {
    console.log(error);
  }
})();

const displayBlog = (articles) => {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    let blogElement = document.createElement("div");
    blogElement.classList.add("blog-card");
    blogElement.innerHTML = `
      <img src = ${article.urlToImage} alt = ${article.title}/>
      <h2>${article.title}</h2>
      <p>${article.description}</p>
        `;
    blogElement.addEventListener("click", () => {
      // Open the URL in a new tab
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogElement);
  });
};
const displaySearch = (data) => {
  resultContainer.innerHTML = "";
  let resultElement = document.createElement("div");
  resultElement.classList.add("result");
  resultElement.innerHTML = `
  <p>Showing ${data} results.....</p>
  `;
  resultContainer.appendChild(resultElement);
};