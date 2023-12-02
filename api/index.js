import fetch from "node-fetch";

const observableUserContent = new RegExp(
  "^https://[\\w-]+.static.observableusercontent.com$"
);

export default function (req, res) {
  const { year, id, session = process.env.SESSION } = req.query;
  console.log({ year, id }, req.headers.origin);
  if (observableUserContent.test(req.headers.origin))
    res.setHeader("access-control-allow-origin", req.headers.origin);
  fetch(
    `https://adventofcode.com/${year}/leaderboard/private/view/${id}.json`,
    { headers: { cookie: `session=${session}` } }
  ).then(({ body }) => body.pipe(res));
}
