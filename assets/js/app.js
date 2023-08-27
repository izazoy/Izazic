var song = document.getElementById("audio");
var playBtn = document.querySelector(".play-inner");
var prevBtn = document.querySelector(".prev-inner");
var nextBtn = document.querySelector(".next-inner");

var range = document.querySelector(".range");

var durationTime = document.querySelector(".remaining");
var totalTime = document.querySelector(".duration");

let isPlaying = true;
let indexSong = 0;

var musicImage = document.querySelector(".songImage");
var musicName = document.querySelector(".songName");
var artistName = document.querySelector(".artistName");

let timer;

let tempSong = 0;

displayTimer();
playBtn.addEventListener("click", playPause);

function playMusic() {
  song.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  isPlaying = false;
  timer = setInterval(displayTimer, 500);
  flagGreenButton = 1;
}

function pauseMusic() {
  song.pause();
  playBtn.innerHTML = `<i class="fa-solid fa-play">`;
  isPlaying = true;
  clearInterval(displayTimer, 500);
  flagGreenButton = 0;
}

function playPause() {
  if (isPlaying) {
    playMusic();
  } else {
    pauseMusic();
  }
}

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

function nextSong() {
  playPause();
  indexSong++;
  if (indexSong >= tempSong + 3) {
    indexSong = tempSong;
  }
  song.setAttribute("src", `./assets/music/${music[indexSong].file}`);
  song.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  musicImage.setAttribute("src", music[indexSong].image);
  musicName.textContent = music[indexSong].title;
  artistName.textContent = music[indexSong].artist;
  heartDisable();
}

function prevSong() {
  playPause();
  indexSong--;
  if (indexSong < tempSong) {
    indexSong = tempSong + 2;
  }
  song.setAttribute("src", `./assets/music/${music[indexSong].file}`);
  song.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  musicImage.setAttribute("src", music[indexSong].image);
  musicName.textContent = music[indexSong].title;
  artistName.textContent = music[indexSong].artist;
  heartDisable();
}

song.addEventListener("ended", nextSong);

function displayTimer() {
  const { duration, currentTime } = song;
  range.max = duration;
  range.value = currentTime;

  totalTime.textContent = formatTime(currentTime);

  if (!duration) {
    durationTime.textContent = "0:00";
  } else {
    durationTime.textContent = formatTime(duration);
  }
}

function formatTime(number) {
  const minute = Math.floor(number / 60);
  const second = Math.floor(number - minute * 60);
  return `${minute < 10 ? "0" + minute : minute}:${
    second < 10 ? "0" + second : second
  }`;
}

range.addEventListener("change", changeBar);

function changeBar() {
  song.currentTime = range.value;
}

function active() {
  indexSong = tempSong;
  heart.style.opacity = "1";
  musicImage.style.opacity = "1";
  song.setAttribute("src", `./assets/music/${music[indexSong].file}`);
  song.play();
  musicImage.setAttribute("src", music[indexSong].image);
  musicName.textContent = music[indexSong].title;
  artistName.textContent = music[indexSong].artist;
}
