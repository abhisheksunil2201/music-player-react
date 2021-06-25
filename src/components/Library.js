import React from "react";
import LibrarySong from "./LibrarySong";

function Library({
  songs,
  setCurrentSong,
  songRef,
  isPlaying,
  setSongs,
  libraryOpen,
}) {
  return (
    <div className={`library ${libraryOpen ? "libraryActive" : ""}`}>
      <h2>Library</h2>
      <div className="library__songs">
        {songs.map((song) => (
          <LibrarySong
            setCurrentSong={setCurrentSong}
            songs={songs}
            song={song}
            id={song.id}
            key={song.id}
            songRef={songRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
