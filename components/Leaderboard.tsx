// src/components/Leaderboard.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Player } from "../context/PlayerContext";
import Pagination from "./Pagination";
import DeleteForm from "./DeleteForm";
import PlayerForm from "./PlayerForm";
import ThemeToggle from "./ThemeToggle";
import GoldMedal from "../public/1st-prize.png";
import SilverMedal from "../public/2nd-place.png";
import BronzeMedal from "../public/3rd-place.png";
import Sticker from "../public/sticker.png";

interface LeaderboardProps {
  players: Player[];
}
const Leaderboard: React.FC<LeaderboardProps> = (props) => {
  const { players } = props;
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const [leaderboardPlayers, setLeaderboardPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setLeaderboardPlayers(players);
    setReady(true);
  }, [players]);
  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setId(id);
    setShow(true);
  };
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(10);
  const sortedPlayers = [...leaderboardPlayers].sort(
    (a, b) => b.score - a.score
  );
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  let currentRecords = sortedPlayers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(leaderboardPlayers.length / recordsPerPage);

  const getInitials = (name: string): string => {
    // Split the string by dot (.)
    const parts = name.split(".");

    // Get the first letter of the first part and the first letter of the last part
    const firstLetter = parts[0].charAt(0).toUpperCase();
    const lastLetter = parts[parts.length - 1].charAt(0).toUpperCase();

    // Return the concatenated initials
    return firstLetter + lastLetter;
  };

  const appendClassname = (index: number, currentPage: number) => {
    if (currentPage == 1 && index == 0) {
      return "gold";
    } else if (currentPage == 1 && index == 1) {
      return "silver";
    } else if (currentPage == 1 && index == 2) {
      return "bronze";
    }
  };

  const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };

  return (
    <React.Fragment>
      <div className="container mt-4 leaderboard-bg">
        <div className="leaderboard-wrapper">
          <h1 className="title-header">Leaderboard</h1>
          <div className="button-header">
            <PlayerForm />
            <ThemeToggle />
          </div>

          {ready && currentRecords.length == 0 ? (
            <div className="placeholder-wrapper">
              <div className="bouncing-text">
                <span className="word">Are</span>
                <span className="word">you</span>
                <span className="word">up</span>
                <span className="word">for</span>
                <span className="word">the</span>
                <span className="word">challenge</span>
                <span className="word">?</span>
              </div>
              <Image
                src={Sticker}
                alt="Health Industry"
                width={400}
                height={400}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
              <h3>No available players</h3>
            </div>
          ) : (
            <ul className="players-list">
              {ready &&
                currentRecords.map((player, index) => (
                  <li
                    onClick={() => handleShow(player.id)}
                    key={player.eid}
                    className="players-data"
                  >
                    <span className="players-rank">
                      {currentPage == 1 && index === 0 ? (
                        <Image
                          src={GoldMedal}
                          alt="Gold Medal"
                          height={60}
                          width={60}
                        />
                      ) : currentPage == 1 && index === 1 ? (
                        <Image
                          src={SilverMedal}
                          alt="Silver Medal"
                          height={60}
                          width={60}
                        />
                      ) : currentPage == 1 && index === 2 ? (
                        <Image
                          src={BronzeMedal}
                          alt="Bronze Medal"
                          height={60}
                          width={60}
                        />
                      ) : currentPage == 1 ? (
                        <p>{index + 1}</p>
                      ) : (
                        <p>{currentPage * recordsPerPage - 9 + index}</p>
                      )}
                    </span>
                    <span
                      className={"players-pic"}
                      style={{
                        backgroundColor:
                          currentPage == 1 && index == 0
                            ? "#ffd700"
                            : currentPage == 1 && index == 1
                            ? "#c0c0c0"
                            : currentPage == 1 && index == 2
                            ? "#CD7F32"
                            : "#4ce0e4",
                      }}
                    >
                      {getInitials(player.eid)}
                    </span>
                    <div
                      className={`players-data-wrapper ${appendClassname(
                        index,
                        currentPage
                      )}`}
                    >
                      <span
                        className={`players-eid ${
                          player.eid.length > 10 ? "compress" : ""
                        }`}
                      >
                        {player.eid}
                      </span>
                      <span
                        className={`players-project ${
                          player.project.length > 10 ? "compress" : ""
                        }`}
                      >
                        {player.project}
                      </span>
                      <span className="players-score">{player.score}</span>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
        {currentRecords.length != 0 && sortedPlayers.length > 10 && (
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      <DeleteForm handleClose={handleClose} id={id} show={show} />
    </React.Fragment>
  );
};

export default Leaderboard;
