const newFactButton = document.getElementById("newFactButton");
const factDisplay = document.getElementById("factDisplay");
const likeButton = document.getElementById("likeButton");
const heart = document.getElementById("heart");
const userName = document.getElementById("userName");
const userComment = document.getElementById("userComment");
const postCommentButton = document.getElementById("postCommentButton");
const commentsList = document.getElementById("comments");
const factImage = document.getElementById("factImage");

let facts = [];
let currentIndex = 0;

// Fetch facts from the API
fetchFacts();

newFactButton.addEventListener("click", displayNewFact);
likeButton.addEventListener("click", likeFact);
postCommentButton.addEventListener("click", postComment);

function fetchFacts() {
  fetch("http://localhost:3000/facts")
    .then((response) => response.json())
    .then((data) => {
      facts = data;
      displayFact(currentIndex);
      resetHeartColor(); // Call the resetHeartColor function when fetching facts
    })
    .catch((error) => {
      console.error("Error fetching facts:", error);
    });
}

function displayFact(index) {
  if (facts.length === 0) {
    factDisplay.textContent = "No facts available.";
  } else {
    const fact = facts[index];
    factDisplay.textContent = fact.fact;
  }
}

function displayNewFact() {
  if (facts.length === 0) {
    factDisplay.textContent = "No facts available.";
  } else {
    currentIndex = (currentIndex + 1) % facts.length;
    displayFact(currentIndex);
    resetHeartColor(); // Call the resetHeartColor function when displaying a new fact
  }
}

function likeFact() {
  heart.classList.add("liked");
}

function resetHeartColor() {
  heart.classList.remove("liked"); // Remove the "liked" class to reset heart color
}

function postComment() {
  const name = userName.value;
  const comment = userComment.value;
  if (name && comment) {
    const listItem = document.createElement("li");
    listItem.textContent = `(Name: ${name}, Comment: ${comment})`;
    commentsList.appendChild(listItem);
  }
  userName.value = "";
  userComment.value = "";
}
