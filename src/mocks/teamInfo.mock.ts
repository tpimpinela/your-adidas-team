import { TeamInfo } from "../models/teams.models";

const teamInfoMock: TeamInfo = {
  team: {
    id: 1,
    name: "Belgium",
    code: "BEL",
    country: "Belgium",
    founded: 1895,
    national: true,
    logo: "https://media.api-sports.io/football/teams/1.png",
  },
  venue: {
    id: 173,
    name: "Stade Roi Baudouin",
    address: "Avenue de Marathon 135/2",
    city: "Brussel",
    capacity: 50093,
    surface: "grass",
    image: "https://media-3.api-sports.io/football/venues/173.png",
  },
};

export default teamInfoMock;
