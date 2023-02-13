import { PlayerPosition, Squad } from "../models/squads.models";

const squadMock: Squad = {
  team: {
    id: 9,
    name: "Spain",
    logo: "https://media.api-sports.io/football/teams/9.png",
  },
  players: [
    {
      id: 18959,
      name: "Robert Lynch Sánchez",
      age: 26,
      number: 1,
      position: PlayerPosition.Goalkeeper,
      photo: "https://media.api-sports.io/football/players/18959.png",
    },
  ],
};

export default squadMock;
