import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentMethods = {
  values: ["card", "cash"],
  message: "enum validator failed for payment Methods",
};

const orderSchema = new Schema(
  {
    products: { type: [Schema.Types.Mixed], required: true },
    subTotal: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, required: true, enum: paymentMethods },
    paymentStatus: { type: String, default: "pending" },
    status: { type: String, default: "pending" },
    address: { type: Schema.Types.ObjectId, ref: "Addresses", required: true },
  },
  { timestamps: true }
);

const virtualId = orderSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Order = mongoose.model("Order", orderSchema);
