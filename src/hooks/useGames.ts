import useData from "./useData";
import type { Genre } from "./useGenre";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface genre {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
 parent_platforms: { platform: Platform }[];
 metacritic: number;
 genres: genre[];
}

const useGames = (selectedGenre: Genre | null) => useData<Game>("/games", { params: { genres: selectedGenre?.id }}, [selectedGenre?.id]);

export default useGames;