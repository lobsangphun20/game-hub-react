import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
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
}

interface FetchGamesResponse {
  count: number;
  //next: string | null;
  //previous: string | null;
  results: Game[];
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

  // which render after every state change, which is not what we want. We want to fetch games only once when the component mounts. To achieve this, we can pass an empty array as the second argument to useEffect, which tells React to only run the effect once after the initial render.
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((r) => {
        setGames(r.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      })
      // .finally(() => setLoading(false)); // This is how we do it properly

    return () => { // cleanup function to abort the fetch request if the component unmounts before the request completes
      controller.abort();
    };
  }, []);
  return { games, error, isLoading };
};

export default useGames;