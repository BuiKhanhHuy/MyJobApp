import {useState, useEffect} from 'react';

const useLayout = () => {
  const [layout, setLayout] = useState({x: 0, y: 0, width: 0, height: 0});
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);

  const handleLayout = event => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setLayout({x, y, width, height});
    setIsLayoutLoading(false);
  };

  useEffect(() => {
    setIsLayoutLoading(true);
  }, []);

  return [layout, isLayoutLoading, handleLayout];
};

export default useLayout;
