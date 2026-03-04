import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
  id: number;
  name: string;
  background_image: string;
  // parent_platforms: { platform: { id: number; name: string } }[];
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

  // which render after every state change, which is not what we want. We want to fetch games only once when the component mounts. To achieve this, we can pass an empty array as the second argument to useEffect, which tells React to only run the effect once after the initial render.
  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((r) => setGames(r.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => { // cleanup function to abort the fetch request if the component unmounts before the request completes
      controller.abort();
    };
  }, []);
  return { games, error };
};

export default useGames;