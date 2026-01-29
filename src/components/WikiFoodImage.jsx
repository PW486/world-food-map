import React, { useState, useEffect } from 'react';

const WikiFoodImage = ({ foodName, className }) => {
  const placeholderUrl = `https://placehold.co/600x400?text=${encodeURIComponent(foodName)}`;
  const [imageUrl, setImageUrl] = useState(placeholderUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setImageUrl(placeholderUrl);
    setLoading(true);

    const fetchImage = async () => {
      try {
        const searchTerm = encodeURIComponent(foodName);
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${searchTerm}&gsrlimit=1&prop=imageinfo&iiprop=url&format=json&origin=*`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.query && data.query.pages) {
          const pages = Object.values(data.query.pages);
          if (pages.length > 0 && pages[0].imageinfo && pages[0].imageinfo.length > 0) {
            if (isMounted) {
              setImageUrl(pages[0].imageinfo[0].url);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching image for", foodName, error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchImage();
    return () => { isMounted = false; };
  }, [foodName, placeholderUrl]);

  return (
    <div className={className} style={{ backgroundColor: '#e2e8f0', position: 'relative', overflow: 'hidden' }}>
      <img 
        src={imageUrl} 
        alt={foodName} 
        className="w-100 h-100 object-fit-cover"
        style={{ transition: 'opacity 0.3s ease-in-out' }}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          if (e.target.src !== placeholderUrl) {
            e.target.src = placeholderUrl;
          }
          setLoading(false);
        }}
      />
    </div>
  );
};

export default WikiFoodImage;
