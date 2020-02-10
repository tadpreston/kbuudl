import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!isLength(password, { min: 6 })) {
      return res.status(422).send("Password must be at least 6 characters long.");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email is not valid");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with this email ${email}`);
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json(token);
  } catch(error) {
    console.error(error);
    res.status(500).send("Error creating user. Please try again later.");
  }
}