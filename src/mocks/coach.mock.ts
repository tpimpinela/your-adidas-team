import { Coach } from "../models/coaches.models";

const coachMock: Coach = {
  id: 193,
  name: "Luis Enrique",
  firstname: "Luis Enrique",
  lastname: "Martínez García",
  age: 52,
  birth: {
    date: new Date(),
    place: "Gijón",
    country: "Spain",
  },
  nationality: "Spain",
  height: "180 cm",
  weight: "73 kg",
  photo: "https://media-3.api-sports.io/football/coachs/193.png",
  team: {
    id: 9,
    name: "Spain",
    logo: "https://media.api-sports.io/football/teams/9.png",
  },
  career: [],
};

export default coachMock;
