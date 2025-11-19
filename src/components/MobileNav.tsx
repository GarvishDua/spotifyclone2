import { Home, Search, Library } from 'lucide-react';

export const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-24 left-0 right-0 bg-player border-t border-border z-20">
      <div className="flex items-center justify-around py-2">
        <button className="flex flex-col items-center gap-1 text-foreground px-4 py-2">
          <Home size={24} />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground px-4 py-2">
          <Search size={24} />
          <span className="text-xs font-semibold">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground px-4 py-2">
          <Library size={24} />
          <span className="text-xs font-semibold">Your Library</span>
        </button>
      </div>
    </div>
  );
};
