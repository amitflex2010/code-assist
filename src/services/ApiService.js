import { APIClient } from "../clients/axiosClient";

export const getClaimDocs = async () => {
  const response = await APIClient({ method: "get", url: "document" });
  console.log(response);
  return response.data;
};
