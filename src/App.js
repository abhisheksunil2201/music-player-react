import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import songsList from "./data";
import { useRef, useState } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const songRef = useRef(null);

  const [songs, setSongs] = useState(songsList());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryOpen, setLibraryOpen] = useState(false);

  const songTimeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const handleSongEnd = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) songRef.current.play();
  };

  return (
    <div className={`App ${libraryOpen ? "library__active" : ""}`}>
      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        songRef={songRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songRef={songRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryOpen={libraryOpen}
      />
      <audio
        onTimeUpdate={songTimeUpdateHandler}
        onLoadedMetadata={songTimeUpdateHandler}
        ref={songRef}
        src={currentSong.audio}
        onEnded={handleSongEnd}
      ></audio>
    </div>
  );
}

export default App;
