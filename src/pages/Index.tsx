import { useState } from 'react';
import { PlayerProvider } from '@/contexts/PlayerContext';
import { Sidebar } from '@/components/Sidebar';
import { HomeView } from '@/components/HomeView';
import { PlaylistView } from '@/components/PlaylistView';
import { Player } from '@/components/Player';
import { MobileNav } from '@/components/MobileNav';
import { playlists } from '@/data/musicData';

const Index = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const handlePlaylistSelect = (playlistId: string) => {
    setSelectedPlaylist(playlistId);
  };

  const currentPlaylist = playlists.find(p => p.id === selectedPlaylist);

  return (
    <PlayerProvider>
      <div className="h-screen flex flex-col bg-background text-foreground">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            onPlaylistSelect={handlePlaylistSelect}
            selectedPlaylist={selectedPlaylist}
          />
          {currentPlaylist ? (
            <PlaylistView playlist={currentPlaylist} />
          ) : (
            <HomeView onPlaylistSelect={handlePlaylistSelect} />
          )}
        </div>
        <MobileNav />
        <Player />
      </div>
    </PlayerProvider>
  );
};

export default Index;
