import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export async function getGithubAccessToken(userId: string) {
  const dataRes = await axios.post(`${process.env.DOMAIN_ID}/oauth/token`, {
    client_id: process.env.MGMT_CLIENT_ID,
    client_secret: process.env.MGMT_CLIENT_SECRET,
    audience: `${process.env.DOMAIN_ID}/api/v2/`,
    grant_type: "client_credentials",
  });

  const mgmtToken = dataRes.data.access_token;

  const userRes = await axios.get(
    `${process.env.DOMAIN_ID}/api/v2/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${mgmtToken}`,
      },
    }
  );

  const githubIdentity = userRes.data.identities.find(
    (i: any) => i.provider === "github"
  );

  if (!githubIdentity?.access_token) {
    throw new Error("GitHub access token not found for user");
  }
  return githubIdentity.access_token;
}
