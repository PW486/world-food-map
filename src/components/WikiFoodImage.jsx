import React, { useState, useEffect } from 'react';

const WikiFoodImage = ({ foodName, className }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
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

        return () => {
            isMounted = false;
        };
    }, [foodName]);

    // If no Wikimedia image found, use placeholder
    const displayUrl = imageUrl || `https://placehold.co/600x400?text=${encodeURIComponent(foodName)}`;

    return (
        <img 
            src={displayUrl} 
            alt={foodName} 
            className={className}
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = `https://placehold.co/600x400?text=${encodeURIComponent(foodName)}`;
            }}
        />
    );
};

export default WikiFoodImage;