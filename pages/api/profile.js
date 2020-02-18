import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { name, email } = req.body;

  try {
    if (!isEmail(email)) {
      return res.status(422).send("Email is not valid");
    }

    
  } catch(error) {
    console.error(error);
    res.status(500).send("Error updating user's profile");
  }
}
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed.`);
      break;
  }
