import { GENIUS_CLIENT_ACCESS_TOKEN } from "./constants";

export const getAxiosConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${GENIUS_CLIENT_ACCESS_TOKEN}`,
    },
  };
};
