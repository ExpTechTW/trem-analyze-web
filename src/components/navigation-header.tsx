'use client';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDarkMode } from '@/hooks/useDarkMode';

const NavigationHeader = () => {
  const { isDarkMode, toggleDarkMode, mounted } = useDarkMode();

  return (
    <div className="border-b">
      <div className={`
        container mx-auto flex items-center justify-between px-4 py-4
      `}
      >
        <div className="flex space-x-4 text-3xl font-bold">
          TREM 檢知報告
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? '切換淺色模式' : '切換深色模式'}
        >
          {mounted && isDarkMode
            ? <Sun className="h-5 w-5" />
            : (
                <Moon className="h-5 w-5" />
              )}
        </Button>
      </div>
    </div>
  );
};

export default NavigationHeader;
