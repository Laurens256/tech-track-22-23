import fetch from 'node-fetch';

const redirect_uri = process.env.REDIRECT_URI_DECODED;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// export const config = {
//   runtime: 'experimental-edge',
// };

export default async function handler(req, res) {
  console.time();
  //haal token op met code die je krijgt van user login
  const tokensRaw = (await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: redirect_uri,
    }).toString(),
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })).json();

  //stuur access token terug in res headers
  const tokens = await tokensRaw;
  console.timeEnd();
  res.status(200);
  res.send({'access_token': tokens.access_token});
}
