const songul = document.querySelector(".library-songs").getElementsByTagName("ul")[0];
const ssong = document.querySelector(".ssong");
const play2 = document.getElementById("play2");
const timeInfo = document.querySelector(".timing");
const circle = document.getElementById("circle");
const line = document.getElementById("line");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const hamburger = document.getElementById("hamburger");
const left = document.getElementById("leftt");
const close = document.querySelector("#close");
const right = document.getElementById("right");
const player = document.querySelector(".music-player");
const playbar = document.querySelector(".playbar");
const close2 = document.querySelector("#close2");
let Songs = [];

const currentsong = new Audio();

function playmusic(track) {
  currentsong.src = "/Songs/" + track;
  currentsong.play();
player.style.animation='roll 3s linear infinite'
  ssong.innerHTML = track;
  play2.src = "icons/pause.svg";
}

function formatTime(seconds) {
  if (isNaN(seconds)) {
    return "00:00";
  }
  seconds = Math.floor(seconds);
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

fetch("http://127.0.0.1:5500/Songs/")
  .then((response1) => {
    return response1.text();
  })
  .then((response2) => {
    const div = document.createElement("div");
    div.innerHTML = response2;
    const as = div.getElementsByTagName("a");

    for (let i = 0; i < as.length; i++) {
      const element = as[i];
      if (element.href.endsWith(".mp3")) {
        Songs.push(element.href);
      }
    }

    for (const song of Songs) {
      songul.innerHTML =
        songul.innerHTML +
        `<li> <img src="icons/music.svg" alt="" class="invert">
                <div class="song">${
                  song.replaceAll("%20", " ").split("/Songs/")[1]
                }</div>
                <img src="icons/play2.svg" alt="" class="invert playy"></li>`;
    }
  })
  .catch((Error) => {
    console.log(`Error something went wrong ${Error}`);
  });

songul.addEventListener("click", (e) => {
  if (e.target.classList.contains("playy")) {
    playmusic(e.target.parentElement.querySelector(".song").innerHTML.trim());
  }
});

play2.addEventListener("click", (e) => {
  if (play2.src='icons/pause.svg'){
    player.style.animation='none'
  }

  if (currentsong.paused) {
    currentsong.play();
    player.style.animation='roll 3s linear infinite'
    play2.src = "icons/pause.svg";
  } else {
    currentsong.pause();
    play2.src = "icons/play2.svg";

  }
});

currentsong.addEventListener("timeupdate", (e) => {
  timeInfo.innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(
    currentsong.duration
  )}`;
  circle.style.left = `${
    (currentsong.currentTime / currentsong.duration) * 100
  }%`;
});

previous.addEventListener("click", (e) => {
  let index1 = Songs.indexOf(currentsong.src);
  if (index1 > 0) {
    currentsong.pause();
    playmusic(Songs[index1 - 1].replaceAll("%20", " ").split("/Songs/")[1]);
  }
});

next.addEventListener("click", (e) => {
  const index2 = Songs.indexOf(currentsong.src);

  if (index2 < Songs.length - 1) {
    currentsong.pause();
    playmusic(Songs[index2 + 1].replaceAll("%20", " ").split("/Songs/")[1]);
  }
});
hamburger.addEventListener("click", (e) => {
  left.style.left = "0%";
  left.style.backgroundColor = "black";
});
close.addEventListener("click", (e) => {
  left.style.left = "-110%";
});

player.addEventListener("click", (e) => {
  playbar.style.display = "block";
});
close2.addEventListener("click", () => {
  if (window.innerWidth < 475) {
    playbar.style.display = "none";
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 475) {
    playbar.style.display = "block"; 
  } else {
    playbar.style.display = "none";
  }
});
line.addEventListener('click',(e)=>{
  let percent =(e.offsetX/e.target.getBoundingClientRect().width)*100
  console.log(e.offsetX,e.target.getBoundingClientRect().width);
  circle.style.left=percent +'%'
  currentsong.currentTime=((currentsong.duration)*percent)/100
})
