export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await fetch(
      "http://localhost:5005/webhooks/rest/webhook",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "user", message: req.body.message }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).end();
  }
}
