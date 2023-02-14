import { SquadValidation } from "../models/validation.model";

/**
 * Get the final validation message that can be shown to the user.
 * @param {SquadValidation} squadValidation - Computed validation
 * @returns {string} - Final validation message.
 */
const getValidationMessage = (squadValidation: SquadValidation) =>
  Object.values(squadValidation)
    .filter((possibleMessage) => typeof possibleMessage === "string")
    .join("\n");

export default getValidationMessage;
