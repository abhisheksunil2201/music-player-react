import React from "react";

const LibrarySong = ({
  songs,
  song,
  setCurrentSong,
  id,
  songRef,
  isPlaying,
  setSongs,
}) => {
  const handleSongSelect = async () => {
    await setCurrentSong(song);
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
    if (isPlaying) songRef.current.play();
  };
  return (
    <div
      onClick={handleSongSelect}
      className={`library__song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song__description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
