import { useState, useEffect } from 'react';

export const useContextMenu = () => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();

  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return {
    clicked,
    setClicked,
    points,
    setPoints,
    selectedItemId,
    setSelectedItemId,
  };
};
