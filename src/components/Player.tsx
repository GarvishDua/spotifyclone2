import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/contexts/PlayerContext';

export const Player = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlay,
    setVolume,
    seekTo,
    playNext,
    playPrevious,
  } = usePlayer();

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeToggle = () => {
    setVolume(volume === 0 ? 0.7 : 0);
  };

  if (!currentSong) {
    return (
      <div className="h-24 bg-player border-t border-border flex items-center justify-center">
        <p className="text-muted-foreground">Select a song to play</p>
      </div>
    );
  }

  return (
    <div className="h-24 bg-player border-t border-border px-4 flex items-center justify-between">
      {/* Current Track Info */}
      <div className="flex items-center gap-4 w-80">
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="w-14 h-14"
        />
        <div className="overflow-hidden">
          <p className="font-semibold truncate">{currentSong.title}</p>
          <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={playPrevious}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="bg-foreground text-background rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
          <button
            onClick={playNext}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={(value) => seekTo(value[0])}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 w-80 justify-end">
        <button
          onClick={handleVolumeToggle}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0] / 100)}
          className="w-24"
        />
      </div>
    </div>
  );
};
