import mongoose from "mongoose";

export interface IQuota extends mongoose.Document {
  username: string;
  responseCount: number;
}

type QuotaModel = mongoose.Model<IQuota, {}>;

export const QuotaSchema = new mongoose.Schema<IQuota>({
  username: { type: String, required: true },
  responseCount: { type: Number, required: true },
});

export const Quota =
  (mongoose.models.Quota as QuotaModel) ||
  mongoose.model<IQuota, QuotaModel>("Quota", QuotaSchema);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);
