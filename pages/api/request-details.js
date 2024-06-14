const { findUserIdByEmail } = require("@utils/findUserIdByEmail");
const {findRequestByUserId} = require("@utils/findRequestByUserId");

export default async function handler(req, res) {
  const { email } = req.query;
  console.log('Email:', email);
  try {
    
    const matchedUserId = await findUserIdByEmail(email);
    const request = await findRequestByUserId(matchedUserId);

    console.log('Request Object:', request);
    res.json({ request });
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
