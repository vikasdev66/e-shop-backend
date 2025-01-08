import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  country: { type: String, required: true, trim: true },
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  pinCode: {
    type: String,
    required: true,
    match: [/^\d{6}$/, "Pin code must be 6 digits"],
  },
  userId: { type: String, required: true },
});

const virtualId = addressSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});

addressSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Address = mongoose.model("Addresses", addressSchema);
