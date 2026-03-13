import useGenre from "../hooks/useGenre";

const GenreList = () => {
  const { genres } = useGenre();

  return (
    <ul>
      {genres.map((g) => (
        <li key={g.id}>{g.name}</li>
      ))}
    </ul>
  );
};

export default GenreList;
