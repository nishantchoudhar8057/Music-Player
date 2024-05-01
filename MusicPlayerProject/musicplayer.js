let songs = [
    { id: 1, name: "Song 1", artist: "Artist 1", img: "song1.jpg", genre: "pop", source: "song1.mp3" },
    { id: 2, name: "Song 2", artist: "Artist 2", img: "song2.jpg", genre: "rock", source: "song2.mp3" },
    { id: 3, name: "Song 3", artist: "Artist 3", img: "song3.jpg", genre: "hiphop", source: "song3.mp3" },
    // Add more songs as needed
  ];
  
  let playlists = [];
  
  let currentSongIndex = 0;
  let currentPlaylistIndex = -1;
  
  function toggleTheme() {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }
  
  function showSongs() {
    let genre = document.querySelector(".all-songs-div select").value;
    let filteredSongs = songs;
    if (genre !== "all") {
      filteredSongs = songs.filter(song => song.genre === genre);
    }
    renderSongs(filteredSongs);
  }
  
  function renderSongs(songsToRender) {
    let songList = document.getElementById("song-list");
    songList.innerHTML = "";
    songsToRender.forEach(song => {
      let li = document.createElement("li");
      li.textContent = song.name + " - " + song.artist;
      li.onclick = () => {
        currentSongIndex = songs.indexOf(song);
        renderCurrentSong();
      };
      songList.appendChild(li);
    });
    renderCurrentSong();
  }
  
  function renderCurrentSong() {
    let currentSong = songs[currentSongIndex];
    let songCard = document.getElementById("song-card");
    songCard.innerHTML = `
      <img src="${currentSong.img}" alt="${currentSong.name}">
      <p>${currentSong.name}</p>
      <p>${currentSong.artist}</p>
    `;
    let audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = currentSong.source;
    audioPlayer.play();
  }
  
  function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong();
  }
  
  function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong();
  }
  
  function addToPlaylist() {
    if (currentPlaylistIndex === -1) {
      alert("Please select a playlist first.");
      return;
    }
    let currentSong = songs[currentSongIndex];
    playlists[currentPlaylistIndex].songs.push(currentSong);
    renderPlaylistSongs(currentPlaylistIndex); 
  }
  
  
  function createPlaylist() {
    let playlistName = prompt("Enter playlist name:");
    if (playlistName) {
      let newPlaylist = { name: playlistName, songs: [] };
      playlists.push(newPlaylist);
      renderPlaylists();
      renderPlaylistSongs(playlists.length - 1);
    }
  }
  
  function renderPlaylists() {
    let playlistList = document.getElementById("playlist-list");
    playlistList.innerHTML = "";
    playlists.forEach((playlist, index) => {
      let li = document.createElement("li");
      li.textContent = playlist.name;
      li.onclick = () => renderPlaylistSongs(index);
      playlistList.appendChild(li);
    });
  }
  
  function renderPlaylistSongs(index) {
    currentPlaylistIndex = index;
    let playlist = playlists[index];
    let songList = document.getElementById("song-list");
    songList.innerHTML = "";
    playlist.songs.forEach(song => {
      let li = document.createElement("li");
      li.textContent = song.name + " - " + song.artist;
      li.onclick = () => {
        currentSongIndex = songs.indexOf(song);
        renderCurrentSong();
      };
      songList.appendChild(li);
    });
    renderCurrentSong();
  }
  
  function searchSongs(keyword) {
    let filteredSongs = songs.filter(song => 
      song.name.toLowerCase().includes(keyword.toLowerCase()) ||
      song.artist.toLowerCase().includes(keyword.toLowerCase())
    );
    renderSongs(filteredSongs);
  }
  
  function searchPlaylist(keyword) {
    let filteredPlaylists = playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(keyword.toLowerCase())
    );
    renderPlaylists(filteredPlaylists);
  }
  
  window.onload = () => {
    renderSongs(songs);
    renderPlaylists();
  };
  