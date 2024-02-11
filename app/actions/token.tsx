"use server";

export async function getAccessToken() {
  const issuerURL = process.env.KINDE_ISSUER_URL;
  const clientID = process.env.KINDE_CLIENT_ID;
  const clientSecret = process.env.KINDE_CLIENT_SECRET;

  if (!issuerURL) {
    throw new Error("KINDE_ISSUER_URL is not defined");
  } else if (!clientID) {
    throw new Error("KINDE_CLIENT_ID is not defined");
  } else if (!clientSecret) {
    throw new Error("KINDE_CLIENT_SECRET is not defined");
  }

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString(
      "base64"
    )}`,
  };

  const requestBody = new URLSearchParams();
  requestBody.append("grant_type", "client_credentials");

  try {
    const response = await fetch(`${issuerURL}/oauth2/token`, {
      method: "POST",
      headers: headers,
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("Failed to obtain access token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error: any) {
    console.error("Error fetching token:", error.message);
    throw error;
  }
}
