import type { GameQuery } from "../App";
import useData from "./useData";

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

const useGames = (gameQuery: GameQuery) => 
  useData<Game>("/games", 
    { params: 
      { genres: gameQuery.genre?.id, 
        platforms: gameQuery.platform?.id, 
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,

      }}, 
      [gameQuery]); // dependency array. Whenever the gameQuery object changes, the useData hook will re-run and fetch new data based on the updated query parameters. This ensures that the game list is always in sync with the selected genre and platform.

export default useGames;