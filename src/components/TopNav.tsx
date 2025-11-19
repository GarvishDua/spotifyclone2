import { ChevronLeft, ChevronRight, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TopNav = () => {
  return (
    <div className="h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Navigation arrows */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground font-semibold hidden md:flex"
        >
          Sign up
        </Button>
        <Button
          className="bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-full px-8"
        >
          Log in
        </Button>
      </div>
    </div>
  );
};
