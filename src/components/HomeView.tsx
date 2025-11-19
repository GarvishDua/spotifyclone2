import { playlists } from '@/data/musicData';

interface HomeViewProps {
  onPlaylistSelect: (playlistId: string) => void;
}

export const HomeView = ({ onPlaylistSelect }: HomeViewProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Good evening</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => onPlaylistSelect(playlist.id)}
              className="bg-card p-4 rounded-lg hover:bg-hover transition-all cursor-pointer group"
            >
              <div className="relative mb-4">
                <img
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg transform translate-y-2 group-hover:translate-y-0">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold mb-2 truncate">{playlist.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {playlist.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
