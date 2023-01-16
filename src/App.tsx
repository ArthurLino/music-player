import { createRef, useEffect, useState } from "react";

import musicBanner from "./assets/images/1.jpeg";
import musicPath from "./assets/musics/1.mp3";

import fastBackwardIcon from "./assets/images/backward.svg";
import fastForwardIcon from "./assets/images/forward.svg";
import playIcon from "./assets/images/play.svg";
import pauseIcon from "./assets/images/pause.svg";
import githubIcon from "./assets/images/github.svg";
import linkedinIcon from "./assets/images/linkedin.svg";

import "./styles/global.scss";
import "./styles/app.scss";

function App() {
  const audioRef = createRef<HTMLAudioElement>();
  const progressRef = createRef<HTMLInputElement>();
  const [currentMusic, setCurrentMusic] = useState<string>(musicPath);
  const [musicDuration, setMusicDuration] = useState<number>(0);
  const [musicCurrentTime, setMusicCurrentTime] = useState<number>(0);
  const [progressTime, setProgressTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function formatMinutesAndSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    setProgressTime(musicCurrentTime);
    progressRef.current?.style.setProperty(
      "--background-size",
      `${(musicCurrentTime / musicDuration) * 100}%`
    );
  }, [isPlaying, musicCurrentTime]);

  return (
    <div className="App">
      <main className="player">
        <img src={musicBanner} alt="" />
        <div className="player-text">
          <h1>Os Anjos Te Louvam</h1>
          <h2>Eli Soares</h2>
        </div>
        <audio
          onEnded={() => {
            if (audioRef.current) {
              setIsPlaying(false);
              audioRef.current.currentTime = 0;
            }
          }}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setMusicCurrentTime(Math.floor(audioRef.current.currentTime));
            }
          }}
          onCanPlay={() => {
            if (audioRef.current)
              setMusicDuration(Math.floor(audioRef.current.duration));
          }}
          ref={audioRef}
          src={currentMusic}
        />
        <div className="player-controllers">
          <div className="buttons">
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = musicCurrentTime - 5;
                }
              }}
            >
              <img src={fastBackwardIcon} alt="" />
            </button>
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? (
                <img src={pauseIcon} alt="" />
              ) : (
                <img src={playIcon} alt="" />
              )}
            </button>
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = musicCurrentTime + 5;
                }
              }}
            >
              <img src={fastForwardIcon} alt="" />
            </button>
          </div>
          <input
            className="player-progress"
            type="range"
            step={1}
            min={0}
            max={musicDuration}
            onMouseUp={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = progressTime;
                setMusicCurrentTime(progressTime);
              }
              setIsPlaying(true);
            }}
            onMouseDown={() => {
              setIsPlaying(false);
            }}
            onChange={(e) => {
              setProgressTime(Number(e.target.value));
            }}
            value={progressTime}
            ref={progressRef}
          />
          <div className="player-time">
            <span>{formatMinutesAndSeconds(musicCurrentTime)}</span>
            <span>{formatMinutesAndSeconds(musicDuration)}</span>
          </div>
        </div>
      </main>
      <footer>
        Inspirado no desafio BoraCodar, da Rocketseat.
        <div>
          <a
            href="https://github.com/ArthurLino/music-player/blob/main/README.md"
            target="_blank"
          >
            <img src={githubIcon} alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/arthur-lino-silva-371a10206/"
            target="_blank"
          >
            <img src={linkedinIcon} alt="" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
