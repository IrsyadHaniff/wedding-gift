/*MUSIK
    var musik = new Audio();
musik.src = "assets/audio/goldenhour.mp3";
musik.loop = true;
musik.play();

function mulaiAudio() {
  var play = document.getElementById("play");
  var mute = document.getElementById("mute");

  play.addEventListener('click', fplay);
  mute.addEventListener('click', fmute);

  function fplay() {
    if (musik.paused) {
      musik.play();
      play.style.background = "url(assets/img/icon/play.png)";
      play.style.backgroundSize = "cover";
      play.style.backgroundPosition = "center";
    } else {
      musik.pause();
      play.style.background = "url(assets/img/icon/mute.png)";
      play.style.backgroundSize = "cover";
      play.style.backgroundPosition = "center";
    }
  }
}

window.addEventListener('load', mulaiAudio);
    
    /*HAMBURGER MENU*/
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".navbar-toggler");
  const stickyTop = document.querySelector(".sticky-top");
  const offcanvas = document.querySelector(".offcanvas");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      stickyTop.style.overflow = "visible";
    });
  }

  if (offcanvas) {
    offcanvas.addEventListener("hidden.bs.offcanvas", function () {
      stickyTop.style.overflow = "hidden";
    });
  }
});

/*AREA UCAPAN*/
document.addEventListener("DOMContentLoaded", function () {
  const submitCommentButton = document.getElementById("submitCommentBtn");
  const clearCommentsButton = document.getElementById("clearCommentsBtn");
  const commentContainer = document.getElementById("commentContainer");
  const maxComments = 10; // Batasan jumlah komentar yang ditampilkan

  const availableImages = [
    "assets/img/profil/foto-1.jpg",
    "assets/img/profil/foto-2.jpg",
    "assets/img/profil/foto-3.jpg",
    "assets/img/profil/foto-4.jpg",
    "assets/img/profil/foto-5.jpg",
    "assets/img/profil/foto-6.jpg",
    "assets/img/profil/foto-7.jpg",
    "assets/img/profil/foto-8.jpg",
    "assets/img/profil/foto-9.jpg",
    "assets/img/profil/foto-10.jpg",
    "assets/img/profil/foto-11.jpg",
    "assets/img/profil/foto-12.jpg",
    "assets/img/profil/foto-13.jpg",
    "assets/img/profil/foto-14.jpg",
    "assets/img/profil/foto-15.jpg",
    "assets/img/profil/foto-16.jpg",
  ];

  // Load comments from local storage when page loads
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Function to display comments
  function displayComments() {
    commentContainer.innerHTML = "";

    comments.forEach((comment, index) => {
      const commentElement = createCommentElement(comment, index);
      commentContainer.appendChild(commentElement);
    });
  }

  // Function to create a comment element
  function createCommentElement(comment, index) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
      <img src="${comment.image}" alt="Profile Picture" class="comment-img">
      <div>
        <strong>${comment.name}</strong>
        <span class="comment-time">『${getFormattedTime(comment.timestamp)}』</span>
        <span class="heart-emoji">☑</span>
        <p>${comment.comment}</p>
        <hr>
      </div>
    `;
    return commentElement;
  }

  // Display existing comments on page load
  displayComments();

  submitCommentButton.addEventListener("click", function () {
    const name = document.getElementById("nameInput").value;
    const commentText = document.getElementById("commentInput").value;

    if (name && commentText) {
      const randomImageIndex = Math.floor(Math.random() * availableImages.length);
      const image = availableImages[randomImageIndex];
      const timestamp = new Date().getTime();
      const comment = { name, comment: commentText, image, timestamp };
      comments.push(comment);

      if (comments.length > maxComments) {
        comments.shift(); // Hapus komentar tertua jika jumlah komentar melebihi batas
      }

      localStorage.setItem("comments", JSON.stringify(comments));

      // Clear and display comments
      displayComments();

      document.getElementById("nameInput").value = "";
      document.getElementById("commentInput").value = "";
    } else {
      alert("Silakan isi nama dan komentar Anda!");
    }
  });

  clearCommentsButton.addEventListener("click", function () {
    comments = []; // Menghapus semua komentar dari array
    localStorage.removeItem("comments"); // Menghapus data komentar dari penyimpanan lokal
    displayComments(); // Merender ulang tampilan komentar setelah dihapus
  });

  function getFormattedTime(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleString("en-US", options);
  }
});

/*DISABLE SCROLL*/
const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  playAudio();
}

function playAudio() {
  song.volume = 0.1;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
};

disableScroll();
