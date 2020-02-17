import mongoose from "mongoose"l

const { ObjectId, String } = mongoose.Schema.Types;

const CompanySchema = new mongoose.Schema({
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
    }
    city: {
      type: String
    }
    state: {
      type: String
    }
    zipcode: {
      type: String
    }
  }
  phone: {
    type: String,
    required: true
  }
  logoUrl: {
    type: String
  }
});
