import User from "../../models/User";
import connectDb from "../../utils/connectDb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).send("Invalid email/password combination");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
      res.status(200).json(token);
    } else {
      return res.status(401).send("Invalid email/password combination");
    }
  } catch(error) {
    console.error(error);
    res.status(500).send("Error logging user in. Please try again later");
  }
}
