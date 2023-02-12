import { FootballAPIResponse } from "./footballApiResponse.model";

export interface HttpCache {
  [fullEndpoint: string]: FootballAPIResponse<any> & { validUntil: Date };
}
