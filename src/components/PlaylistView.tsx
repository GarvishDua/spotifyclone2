import { Play, Clock } from 'lucide-react';
import { Playlist } from '@/data/musicData';
import { usePlayer } from '@/contexts/PlayerContext';

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
      {/* Playlist Header */}
      <div className="bg-gradient-to-b from-primary/20 to-background p-8 flex items-end gap-6">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-48 h-48 shadow-2xl"
        />
        <div>
          <p className="text-sm font-semibold uppercase mb-2">Playlist</p>
          <h1 className="text-6xl font-bold mb-6">{playlist.name}</h1>
          <p className="text-muted-foreground mb-2">{playlist.description}</p>
          <p className="text-sm">
            <span className="font-semibold">{playlist.songs.length} songs</span>
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8">
        <button
          onClick={handlePlayAll}
          className="bg-primary text-primary-foreground rounded-full p-4 hover:scale-105 transition-transform shadow-lg"
        >
          <Play size={28} fill="currentColor" />
        </button>
      </div>

      {/* Songs List */}
      <div className="px-8 pb-8">
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
    </div>
  );
};
