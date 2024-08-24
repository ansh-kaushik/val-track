import { useEffect, useState } from "react";
// import EmailTemplate from "./EmailTemplate";

import { Button, Container } from "@mui/material";
import axios, { all } from "axios";
import MMRList from "./components/MMRList";

const getNewKills = async () => {
  // const api_key = "HDEV-8547f177-1188-4cf9-8086-2a8d734ec747";
  const url =
    "https://api.henrikdev.xyz/valorant/v3/matches/ap/mark3000/9463?api_key=HDEV-8547f177-1188-4cf9-8086-2a8d734ec747";
  const res = await axios.get(url);

  const data = res.data.data;
  console.log("🤣🤣", data);

  const lastMatchData = data[0];
  const allPlayerData = lastMatchData.players.all_players;
  const reqUserData = allPlayerData.filter((p) => p.name === "mark3000")[0];
  console.log("🚩🚩", reqUserData);

  const newKills = reqUserData.stats.kills;
  return parseInt(newKills);
};

function App() {
  const [kills, setKills] = useState(0);

  const handleRefreshKills = async (e) => {
    e.preventDefault();
    let prevKills = localStorage.getItem("kills");
    console.log(prevKills);

    if (prevKills === null || prevKills === undefined) prevKills = 0;
    const newKills = await getNewKills();
    localStorage.setItem("kills", parseInt(prevKills) + newKills);
    setKills(localStorage.getItem("kills"));
  };

  useEffect(() => {
    let prevKills = localStorage.getItem("kills");
    if (prevKills === undefined || prevKills === null) prevKills = 0;
    setKills(prevKills);
  }, []);
  return (
    <>
      {/* <h1 className=" m-2">Kill Count:{kills} </h1>

      <Button variant="contained" onClick={handleRefreshKills}>
        {" "}
        Refresh{" "}
      </Button> */}

      <Container
        sx={{
          display: "flex", // Use Flexbox
          flexDirection: "column",
          padding: "10px",
          // justifyContent: "center", // Center horizontally/
          alignItems: "center", // Center vertically (if needed)
          backgroundImage: "url(./v1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          maxHeight: "100vh",
          minWidth: "100vw",
          overflow: "auto",
        }}
      >
        <MMRList />
      </Container>
    </>
  );
}

export default App;
