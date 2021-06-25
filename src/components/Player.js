import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";
import React from "react";

const Player = ({
  songRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const handleActiveLibrary = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  };

  const handlePlay = () => {
    if (isPlaying) {
      songRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      songRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const handleDrag = (e) => {
    songRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const handleSkip = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skipNext") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      handleActiveLibrary(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skipBack") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        handleActiveLibrary(songs[songs.length - 1]);
        if (isPlaying) songRef.current.play();
        return;
      }

      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      handleActiveLibrary(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) songRef.current.play();
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="timeControl">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={handleDrag}
            type="range"
          />
          <div style={trackAnim} className="animate__track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="playControl">
        <SkipPrevious
          onClick={() => handleSkip("skipBack")}
          size="40px"
          className="skip__prev"
        />
        {isPlaying ? (
          <Pause onClick={handlePlay} className="play" />
        ) : (
          <PlayArrow onClick={handlePlay} className="play" />
        )}

        <SkipNext
          onClick={() => handleSkip("skipNext")}
          className="skip__next"
        />
      </div>
    </div>
  );
};

export default Player;
