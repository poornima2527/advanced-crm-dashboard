'use client';

import {
  Bell,
  Search,
  SlidersHorizontal,
  Moon,
  Sun,
  UserCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Topbar({
  search,
  onSearch,
  onFilters,
  count,
}: {
  search: string;
  onSearch: (s: string) => void;
  onFilters: () => void;
  count: number;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex min-h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur md:px-6">
      
      {/* Search */}
      <div className="relative max-w-xl flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search CRM..."
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <Button
        variant="outline"
        size="sm"
        onClick={onFilters}
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />

        Filters

        {count > 0 && (
          <span className="ml-1 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">
            {count}
          </span>
        )}
      </Button>

      {/* Notifications */}
      <Button variant="ghost" size="icon">
        <Bell className="h-4 w-4" />
      </Button>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }
        aria-label="Toggle theme"
      >
        {mounted ? (
          theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )
        ) : (
          <span className="h-4 w-4" />
        )}
      </Button>

      {/* Profile */}
      <UserCircle className="h-7 w-7 text-muted-foreground" />

    </header>
  );
}