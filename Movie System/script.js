let movies = [];
let btn = document.getElementById("btn");
let tableBody = document.getElementById("body");
let searchInput = document.getElementById("search");
let date = new Date();
let localDate = date.toLocaleDateString();
let editingRow = null;

function addMovie() {
  let movieTitle = document.getElementById("movie-title").value;
  let movieGenre = document.getElementById("movie-genre").value;
  let movieRating = document.getElementById("rating").value;

  if (movieTitle === "" || movieGenre === "" || movieRating === "") {
    alert("Please enter movie name, genre, and rating.");
    return;
  }

  let movie = {
    title: movieTitle,
    genre: movieGenre,
    rating: movieRating,
    date: localDate,
  };
  // console.log(movie.localDate);

  if (editingRow) {
    updateMovie(movieTitle, movieGenre, movieRating);
  } else {
    movies.push(movie);
    createMovieRow(movieTitle, movieGenre, movieRating);
  }

  clearInputs();
}

function createMovieRow(title, genre, rating) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");

  td1.innerText = title;
  td2.innerText = genre;
  td3.innerText = rating;
  td5.innerText = localDate;

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

function updateMovie(title, genre, rating) {
  editingRow.children[0].innerText = title;
  editingRow.children[1].innerText = genre;
  editingRow.children[2].innerText = rating;

  btn.innerText = "Add Movie";
  editingRow = null;
}

function deleteMovie(row) {
  let index = movies.findIndex(
    (movie) => movie.title === row.children[0].innerText
  );
  if (index !== -1) movies.splice(index, 1);
  row.remove();
}

function clearInputs() {
  document.getElementById("movie-title").value = "";
  document.getElementById("movie-genre").value = "";
  document.getElementById("rating").value = "";
}

// Click event on Add/Update button
btn.addEventListener("click", addMovie);

// Listen for Enter key in input fields
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addMovie();
  }
});

// Search functionality using filter()

searchInput.addEventListener("input", () => {
  let input = searchInput.value.toLowerCase();
  console.log(input);
  let filteredMovie = movies.filter((movie) =>
    movie.title.toLowerCase().includes(input)
  );
  tableBody.innerHTML = "";
  filteredMovie.forEach((movie) => {
    createMovieRow(movie.title, movie.genre, movie.rating);
  });
});

// Search functionality
// function searchMovie() {
//   let input = searchInput.value.toLowerCase();
//   let rows = tableBody.getElementsByTagName("tr");

//   for (let i = 0; i < rows.length; i++) {
//     let title = rows[i].getElementsByTagName("td")[0].innerText.toLowerCase();

//     if (title.includes(input)) {
//       rows[i].style.display = "";
//     } else {
//       rows[i].style.display = "none";
//     }
//   }
// }

// searchInput.addEventListener("input", searchMovie);
