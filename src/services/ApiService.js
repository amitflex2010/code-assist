import { APIClient } from "../clients/axiosClient";

export const getClaimDocs = async () => {
  const response = await APIClient({ method: "get", url: "document" });

  return response.data;
};
