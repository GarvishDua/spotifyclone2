import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song } from '@/data/musicData';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  queue: Song[];
  setQueue: (songs: Song[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const playSong = (song: Song) => {
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.play();
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const playNext = () => {
    if (currentSong && queue.length > 0) {
      const currentIndex = queue.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % queue.length;
      playSong(queue[nextIndex]);
    }
  };

  const playPrevious = () => {
    if (currentSong && queue.length > 0) {
      const currentIndex = queue.findIndex(song => song.id === currentSong.id);
      const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
      playSong(queue[prevIndex]);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        playSong,
        togglePlay,
        setVolume,
        seekTo,
        playNext,
        playPrevious,
        queue,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};
