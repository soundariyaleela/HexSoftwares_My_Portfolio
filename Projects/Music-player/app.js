console.log("JS connected successfully ✅");



const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");

const searchInput = document.getElementById("search");
const clearSearch = document.getElementById("clearSearch");

const playlist = document.getElementById("playlist");
const playlistToggle = document.getElementById("playlistToggle");
const playlistPanel = document.getElementById("playlistPanel");

let index = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

/* ================= SONG DATA ================= */

const songs = [ 
   { title: "Vetriyin Paadhai", artist: "Motivation BGM 🎯", src: "./songs/Vetriyin-Paadhai.mp3", duration: "3:45", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Kanavil Nee", artist: "Melody 💭", src: "./songs/Kanavil-Nee.mp3", duration: "4:12", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Vidiyal Thodangum", artist: "Hope Theme 🌅", src: "./songs/Vidiyal-Thodangum.mp3", duration: "4:05", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Nambikkai Oli", artist: "Positive Vibes ✨", src: "./songs/Nambikkai-Oli.mp3", duration: "3:15", cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Midnight Memories", artist: "Chill 🌙", src: "./songs/Midnight-Memories.mp3", duration: "3:50", cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Rise Up Energy", artist: "Workout 💪", src: "./songs/Rise-Up-Energy.mp3", duration: "2:45", cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Powerful Inspiration", artist: "Cinematic 🎬", src: "./songs/Powerful-Inspiration.mp3", duration: "3:20", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Unstoppable Drive", artist: "Rock 🚀", src: "./songs/Unstoppable-Drive.mp3", duration: "4:30", cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Past Year Memories", artist: "Emotional Piano 🎹", src: "./songs/Past-Year-Memories.mp3", duration: "3:10", cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Fight Back", artist: "Epic ⚔️", src: "./songs/Fight-Back-BGM.mp3", duration: "3:00", cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Never Give Up", artist: "Heroic 🦸", src: "./songs/Never-Give-Up.mp3", duration: "2:55", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Urban Flow", artist: "Beats 🏙️", src: "./songs/Urban-Flow.mp3", duration: "3:45", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }, 
   { title: "Late Night Coffee", artist: "Lo-fi ☕", src: "./songs/Late-Night-Coffee.mp3", duration: "3:30", cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" } 
  ];

/* ================= LOAD SONG ================= */

function loadSong(i) {
  index = i;
  audio.src = songs[i].src;
  title.textContent = songs[i].title;
  artist.textContent = songs[i].artist;
  cover.src = songs[i].cover;

  // Reset time display
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";
  progress.value = 0;

  // Wait for metadata
  audio.onloadedmetadata = () => {
    durationEl.textContent = formatTime(audio.duration);
  };

  updateActive();
}


/* ================= PLAY CONTROLS ================= */

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
  cover.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
  cover.classList.remove("playing");
}

playBtn.onclick = () => (isPlaying ? pauseSong() : playSong());

nextBtn.onclick = () => {
  index = isShuffle
    ? Math.floor(Math.random() * songs.length)
    : (index + 1) % songs.length;
  loadSong(index);
  playSong();
};

prevBtn.onclick = () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  playSong();
};

shuffleBtn.onclick = () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
};

repeatBtn.onclick = () => {
  isRepeat = !isRepeat;
  audio.loop = isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
};

/* ================= PROGRESS & VOLUME ================= */

audio.ontimeupdate = () => {
  if (!audio.duration) return;

  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
};
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}


progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};


/* ================= PLAYLIST ================= */

function buildPlaylist() {
  playlist.innerHTML = "";

  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.className = "playlist-item";
    li.dataset.title = song.title;
    li.textContent = song.title;

    li.onclick = () => {
      loadSong(i);
      playSong();
    };

    playlist.appendChild(li);
  });
}

function updateActive() {
  document.querySelectorAll(".playlist-item").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

/* ================= SEARCH ================= */

function filterSongs(query) {
  query = query.toLowerCase();

  document.querySelectorAll(".playlist-item").forEach(item => {
    const text = item.dataset.title;
    const matchIndex = text.toLowerCase().indexOf(query);

    if (matchIndex !== -1) {
      item.style.display = "block";

      if (query) {
        const before = text.slice(0, matchIndex);
        const match = text.slice(matchIndex, matchIndex + query.length);
        const after = text.slice(matchIndex + query.length);
        item.innerHTML = `${before}<span class="highlight">${match}</span>${after}`;
      } else {
        item.textContent = text;
      }
    } else {
      item.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", () => {
  clearSearch.style.display = searchInput.value ? "block" : "none";
  filterSongs(searchInput.value);
});

clearSearch.onclick = () => {
  searchInput.value = "";
  clearSearch.style.display = "none";
  filterSongs("");
};

/* ================= PLAYLIST TOGGLE ================= */

playlistToggle.onclick = () => {
  playlistPanel.classList.toggle("show");
  playlistToggle.classList.toggle("active");
};

/* ================= INIT ================= */

buildPlaylist();
loadSong(0);

