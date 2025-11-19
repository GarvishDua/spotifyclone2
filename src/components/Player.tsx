import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart } from 'lucide-react';
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
      <div className="fixed bottom-0 left-0 right-0 h-20 md:h-24 bg-player border-t border-border flex items-center justify-center z-30">
        <p className="text-muted-foreground text-sm">Select a song to play</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 md:h-24 bg-player border-t border-border px-2 md:px-4 flex items-center justify-between z-30">
      {/* Current Track Info */}
      <div className="flex items-center gap-2 md:gap-4 w-1/3 md:w-80 min-w-0">
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="w-12 h-12 md:w-14 md:h-14"
        />
        <div className="overflow-hidden min-w-0 flex-1">
          <p className="font-semibold truncate text-xs md:text-sm">{currentSong.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
        </div>
        <button className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
          <Heart size={16} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 max-w-2xl">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={playPrevious}
            className="text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="bg-foreground text-background rounded-full p-1.5 md:p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause size={16} className="md:w-5 md:h-5" fill="currentColor" />
            ) : (
              <Play size={16} className="md:w-5 md:h-5" fill="currentColor" />
            )}
          </button>
          <button
            onClick={playNext}
            className="text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="hidden md:flex items-center gap-2 w-full">
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
      <div className="hidden md:flex items-center gap-2 w-80 justify-end">
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

      {/* Mobile - Just show minimal info */}
      <div className="md:hidden w-16"></div>
    </div>
  );
};
