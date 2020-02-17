import connectDb from "../../utils/connectDb";
import Organization from "../../models/Organization";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { orgName, name, email, password } = req.body;

  try {
    if (!isLength(password, { min: 6 })) {
      return res.status(422).send("Password must be at least 6 characters long.");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email is not valid");
    }

    console.log(orgName);

    const organization = await Organization.findOne({ name: orgName });
    if (organization) {
      return res.status(422).send("An organization with that name already exists");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with this email ${email}`);
    }

    const newOrg = await new Organization({ name: orgName }).save();
    console.log({newOrg});

    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash,
      organization: newOrg._id
    }).save();
    console.log({newUser});

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json(token);
  } catch(error) {
    console.error(error);
    res.status(500).send("Error creating user. Please try again later.");
  }
}
