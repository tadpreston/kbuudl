import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    street1: {
      type: String
    },
    street2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: String
    }
  },
  phone: {
    type: String,
  },
  logoUrl: {
    type: String
  }
});

OrganizationSchema.index({ name: 1 });

export default mongoose.models.Organization || mongoose.model("Organization", OrganizationSchema);
