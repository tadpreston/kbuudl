import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const AccountSchema = new mongoose.Schema({
  users: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  company: {
    type: ObjectId,
    ref: "Organization"
  }
});

export default mongoose.models.Account || mongoose.model("Account", AccountSchema);
