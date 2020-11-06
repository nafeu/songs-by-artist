import { GENIUS_CLIENT_ACCESS_TOKEN } from "./constants";

export const getAxiosConfig = ({
  accessToken = GENIUS_CLIENT_ACCESS_TOKEN
} = {}) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
