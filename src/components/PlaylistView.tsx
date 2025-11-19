import { Play, Clock } from 'lucide-react';
import { Playlist } from '@/data/musicData';
import { usePlayer } from '@/contexts/PlayerContext';
import { TopNav } from './TopNav';

interface PlaylistViewProps {
  playlist: Playlist;
}

export const PlaylistView = ({ playlist }: PlaylistViewProps) => {
  const { playSong, setQueue, currentSong } = usePlayer();

  const handlePlaySong = (index: number) => {
    setQueue(playlist.songs);
    playSong(playlist.songs[index]);
  };

  const handlePlayAll = () => {
    setQueue(playlist.songs);
    playSong(playlist.songs[0]);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <TopNav />
      
      {/* Playlist Header */}
      <div className="bg-gradient-to-b from-primary/20 to-background p-4 md:p-8 flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-32 h-32 md:w-48 md:h-48 shadow-2xl"
        />
        <div>
          <p className="text-xs md:text-sm font-semibold uppercase mb-2">Playlist</p>
          <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">{playlist.name}</h1>
          <p className="text-muted-foreground mb-2 text-sm md:text-base">{playlist.description}</p>
          <p className="text-sm">
            <span className="font-semibold">{playlist.songs.length} songs</span>
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 md:p-8">
        <button
          onClick={handlePlayAll}
          className="bg-primary text-primary-foreground rounded-full p-3 md:p-4 hover:scale-105 transition-transform shadow-lg"
        >
          <Play size={24} className="md:w-7 md:h-7" fill="currentColor" />
        </button>
      </div>

      {/* Songs List - Desktop */}
      <div className="px-4 md:px-8 pb-8 hidden md:block">
        <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border mb-2">
          <div>#</div>
          <div>Title</div>
          <div>Album</div>
          <div className="flex justify-end">
            <Clock size={16} />
          </div>
        </div>

        <div className="space-y-1">
          {playlist.songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => handlePlaySong(index)}
              className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-3 rounded-md hover:bg-hover transition-colors cursor-pointer group ${
                currentSong?.id === song.id ? 'bg-hover text-primary' : ''
              }`}
            >
              <div className="flex items-center justify-center">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={14} fill="currentColor" className="hidden group-hover:block" />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-10 h-10"
                />
                <div>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
              </div>
              <div className="flex items-center text-muted-foreground">
                {song.album}
              </div>
              <div className="flex items-center justify-end text-muted-foreground">
                {song.duration}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Songs List - Mobile */}
      <div className="px-4 pb-32 md:hidden">
        <div className="space-y-2">
          {playlist.songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => handlePlaySong(index)}
              className={`flex items-center gap-3 p-3 rounded-md ${
                currentSong?.id === song.id ? 'bg-hover text-primary' : ''
              }`}
            >
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-12 h-12 rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-sm">{song.title}</p>
                <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground">{song.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
