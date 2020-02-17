import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const AccountSchema = new mongoose.Schema({
  owners: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  company: {
    type: ObjectId,
    ref: "Company"
  }
});

export default mongoose.models.Account || mongoose.model("Account", AccountSchema);
