let movies = [];
let btn = document.getElementById("btn");
let tableBody = document.getElementById("body");
let searchInput = document.getElementById("search");

let editingRow = null;

function addMovie() {
  let movieTitle = document.getElementById("movie-title").value;
  let movieGenre = document.getElementById("movie-genre").value;
  let movieRating = document.getElementById("rating").value;

  if (movieTitle === "" || movieGenre === "" || movieRating === "") {
    alert("Please enter movie name, genre, and rating.");
    return;
  }

  let currentTime = Date.now();

  let movie = {
    title: movieTitle,
    genre: movieGenre,
    rating: movieRating,
    time: currentTime,
  };

  if (editingRow) {
    updateMovie(movieTitle, movieGenre, movieRating, currentTime);
  } else {
    movies.push(movie);
    sortMovies();
    renderMovies();
  }

  clearInputs();
}

function createMovieRow(movie) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");

  td1.innerText = movie.title;
  td2.innerText = movie.genre;
  td3.innerText = movie.rating;
  td5.innerText = new Date(movie.time).toLocaleTimeString();

  let btnEdit = document.createElement("button");
  let btnDelete = document.createElement("button");

  btnEdit.innerText = "Edit";
  btnDelete.innerText = "Delete";

  btnEdit.addEventListener("click", function () {
    editMovie(tr);
  });

  btnDelete.addEventListener("click", function () {
    deleteMovie(tr);
  });

  td4.append(btnEdit, btnDelete);
  tr.append(td1, td2, td3, td4, td5);
  tableBody.appendChild(tr);
}

function editMovie(row) {
  document.getElementById("movie-title").value = row.children[0].innerText;
  document.getElementById("movie-genre").value = row.children[1].innerText;
  document.getElementById("rating").value = row.children[2].innerText;

  editingRow = row;
  btn.innerText = "Update Movie";
}

function updateMovie(title, genre, rating, time) {
  let updatedTime = Date.now();
  editingRow.children[0].innerText = title;
  editingRow.children[1].innerText = genre;
  editingRow.children[2].innerText = rating;
  editingRow.children[4].innerText = new Date(updatedTime).toLocaleTimeString();

  let index = movies.findIndex((movie) => movie.title === title);
  if (index !== -1) {
    movies[index] = { title, genre, rating, time: updatedTime };
    sortMovies();
    renderMovies();
  }

  btn.innerText = "Add Movie";
  editingRow = null;
}

function deleteMovie(row) {
  let index = movies.findIndex(
    (movie) => movie.title === row.children[0].innerText
  );
  if (index !== -1) movies.splice(index, 1);
  renderMovies();
}

function clearInputs() {
  document.getElementById("movie-title").value = "";
  document.getElementById("movie-genre").value = "";
  document.getElementById("rating").value = "";
}

// Sort movies based on time (latest first)
function sortMovies() {
  movies.sort((a, b) => b.time - a.time);
}

// Render movies after sorting
function renderMovies() {
  tableBody.innerHTML = "";
  movies.forEach((movie) => createMovieRow(movie));
}

// Click event on Add/Update button
btn.addEventListener("click", addMovie);

// Listen for Enter key in input fields
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addMovie();
  }
});

// Search functionality
searchInput.addEventListener("input", () => {
  let input = searchInput.value.toLowerCase();
  let filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(input)
  );
  tableBody.innerHTML = "";
  filteredMovies.forEach((movie) => createMovieRow(movie));
});
