import { playlists } from '@/data/musicData';
import { TopNav } from './TopNav';

interface HomeViewProps {
  onPlaylistSelect: (playlistId: string) => void;
}

export const HomeView = ({ onPlaylistSelect }: HomeViewProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <TopNav />
      <div className="p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Good evening</h1>

        <section className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Your Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => onPlaylistSelect(playlist.id)}
                className="bg-card p-3 md:p-4 rounded-lg hover:bg-hover transition-all cursor-pointer group"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded-md shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold mb-2 truncate text-sm md:text-base">{playlist.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                  {playlist.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
