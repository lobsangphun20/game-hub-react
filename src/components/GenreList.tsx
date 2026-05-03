import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGenre, { type Genre } from "../hooks/useGenre";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenre();

  // if (isLoading) return <Spinner />; *****No longer needed since we are using static data, but if we were fetching from an API, we would want to show a loading spinner while the data is being fetched. This is because fetching data from an API can take some time, and we want to provide feedback to the user that something is happening. The spinner indicates that the data is being loaded and will be displayed once it is ready. In this case, since we are using static data, there is no need for a loading state, so we can remove the spinner.*****

  // if (error) return null;

  return (
    <>
      <Heading fontSize={"2xl"} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data.map((g) => (
          <ListItem key={g.id} paddingY={"5px"}>
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit={"cover"}
                src={getCroppedImageUrl(g.image_background)}
              />
              <Button
                fontWeight={g.id === selectedGenre?.id ? "bold" : "normal"}
                onClick={() => onSelectGenre(g)}
                fontSize="lg"
                variant="link"
                whiteSpace={"normal"}
                textAlign={"left"}
              >
                {g.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
