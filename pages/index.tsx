// pages/index.tsx
import { usePlayerContext } from "../context/PlayerContext";
import Leaderboard from "../components/Leaderboard";

const Home = () => {
  const { players } = usePlayerContext();

  // useEffect(() => {
  //   fetchPlayers(); // Fetch posts when the component mounts
  // }, [fetchPlayers]);

  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Leaderboard players={players} />
    </>
  );
};

export default Home;
