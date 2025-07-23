import React from 'react';
import HomeIcon from './icons/HomeIcon';

interface HomeButtonProps {
  onClick: () => void;
  isDarkMode?: boolean;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick, isDarkMode }) => {
  const buttonClasses = isDarkMode 
    ? 'bg-white/10 hover:bg-white/20 text-white' 
    : 'bg-black/5 hover:bg-black/10 text-gray-800';

  return (
    <button
      onClick={onClick}
      className={`fixed top-4 left-4 md:top-6 md:left-6 z-[70] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isDarkMode ? 'focus-visible:ring-white focus-visible:ring-offset-black' : 'focus-visible:ring-black focus-visible:ring-offset-gray-100'} ${buttonClasses}`}
      aria-label="Go to homepage"
    >
      <HomeIcon className="w-6 h-6" />
    </button>
  );
};

export default HomeButton;