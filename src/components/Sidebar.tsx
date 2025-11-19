import { Home, Search, Library, Plus, Heart } from 'lucide-react';
import { playlists } from '@/data/musicData';

interface SidebarProps {
  onPlaylistSelect: (playlistId: string) => void;
  selectedPlaylist: string | null;
}

export const Sidebar = ({ onPlaylistSelect, selectedPlaylist }: SidebarProps) => {
  return (
    <div className="w-64 bg-sidebar flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-8">Spotify</h1>
        
        <nav className="space-y-4">
          <button className="flex items-center gap-4 text-foreground hover:text-primary transition-colors w-full">
            <Home size={24} />
            <span className="font-semibold">Home</span>
          </button>
          <button className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors w-full">
            <Search size={24} />
            <span className="font-semibold">Search</span>
          </button>
          <button className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors w-full">
            <Library size={24} />
            <span className="font-semibold">Your Library</span>
          </button>
        </nav>

        <div className="mt-8 space-y-4">
          <button className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors w-full">
            <Plus size={24} />
            <span className="font-semibold">Create Playlist</span>
          </button>
          <button className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors w-full">
            <Heart size={24} />
            <span className="font-semibold">Liked Songs</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="border-t border-border pt-4">
          <h2 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            Playlists
          </h2>
          <div className="space-y-2">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => onPlaylistSelect(playlist.id)}
                className={`text-sm hover:text-foreground transition-colors block w-full text-left ${
                  selectedPlaylist === playlist.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {playlist.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
