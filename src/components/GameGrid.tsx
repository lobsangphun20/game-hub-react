import { filter, SimpleGrid } from "@chakra-ui/react";
import useGames, { type Platform } from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import type { Genre } from "../hooks/useGenre";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
}

export const GameGrid = ({ selectedGenre, selectedPlatform }: Props) => {
  const { data, error, isLoading } = useGames(selectedGenre, selectedPlatform);
  const filteredGames =
    selectedGenre != null
      ? data.filter((game) =>
          game.genres.some((genre) => genre.name === selectedGenre.name)
        )
      : data;
  const filteredGamesWithPlatform = selectedPlatform
    ? filteredGames.filter((g) =>
        g.parent_platforms.some(
          (matcher) => matcher.platform.id === selectedPlatform.id
        )
      )
    : filteredGames;
  const skeletons = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {error && <p>{error}</p>}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={3}
      >
        {isLoading &&
          skeletons.map((s) => (
            <GameCardContainer key={s}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {filteredGamesWithPlatform.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};
