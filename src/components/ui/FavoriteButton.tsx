"use client";

import { useState, useEffect } from "react";

interface FavoriteButtonProps {
  symbol: string;
}

const FavoriteButton = ({ symbol }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(symbol));
  }, [symbol]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: string) => fav !== symbol);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, symbol]));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-2 py-1 rounded ${
        isFavorite ? "bg-yellow-400 text-white" : "bg-gray-200"
      }`}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
};

export default FavoriteButton;
