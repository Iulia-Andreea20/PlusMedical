const {findUserByCNP} = require("@utils/findUserByCNP");

export default async function handler(req, res) {
  const { cnp } = req.query;

  try {
    const userData = await findUserByCNP(cnp);
    res.json({ userData });
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
