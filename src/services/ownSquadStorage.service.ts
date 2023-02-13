import { TeamMember } from "../models/teamMember.model";

export const ownSquadLocalStorageKey = "squad";

/**
 * Save the squad to the localStorage.
 * @param {TeamMember[]} ownSquad - Squad created by the user
 */
export const saveOwnSquadToStorage = (ownSquad: TeamMember[]) => {
  localStorage.setItem(ownSquadLocalStorageKey, JSON.stringify(ownSquad));
};

/**
 * Get the squad from the localStorage.
 * @returns {TeamMember[] | undefined}
 */
export const getOwnSquadFromStorage = () => {
  const ownSquad = localStorage.getItem(ownSquadLocalStorageKey);
  if (!ownSquad) return;
  return JSON.parse(ownSquad) as TeamMember[];
};
