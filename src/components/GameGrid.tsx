import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
  // background_image: string;
  // parent_platforms: { platform: { id: number; name: string } }[];
}

interface FetchGamesResponse {
  count: number;
  //next: string | null;
  //previous: string | null;
  results: Game[];
}

export const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  // which render after every state change, which is not what we want. We want to fetch games only once when the component mounts. To achieve this, we can pass an empty array as the second argument to useEffect, which tells React to only run the effect once after the initial render.
  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((r) => setGames(r.data.results))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <p>{error}</p>}

      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};
