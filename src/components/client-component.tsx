'use client';

import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [darkMode, setDarkMode] = useState(
    typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true',
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {darkMode ? '切换到明亮模式' : '切换到暗模式'}
      </button>
    </div>
  );
}
