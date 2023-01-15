import { createRef, useCallback, useEffect, useState } from "react";
import musicPath from "./assets/musics/1.mp3";
import musicBanner from "./assets/images/1.jpeg";

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
  }, [isPlaying, musicCurrentTime]);

  return (
    <div className="App">
      <main>
        <div className="player">
          <img src={musicBanner} alt="" />
          <h3>Os Anjos Te Louvam</h3>
          <h4>Eli Soares</h4>
          <audio
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
          <div className="controller">
            <div>
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = musicCurrentTime - 5;
                  }
                }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
              >
                Play/Pause
              </button>
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = musicCurrentTime + 5;
                  }
                }}
              >
                Next
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
                console.log(Number(e.target.value));
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
        </div>
      </main>
    </div>
  );
}

export default App;
