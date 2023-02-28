import mongoose from "mongoose";

export interface IQuota extends mongoose.Document {
  username: string;
  responseCount: number;
  apiKey?: string;
}

export interface IResponse extends mongoose.Document {
  username: string;
  prompt: string;
  response: string;
  apiKey?: string;
  timeCreated: number;
  dateStamp: string;
}

type QuotaModel = mongoose.Model<IQuota, {}>;
type ResponseModel = mongoose.Model<IResponse, {}>;

export const QuotaSchema = new mongoose.Schema<IQuota>({
  username: { type: String, required: true },
  responseCount: { type: Number, required: true },
  apiKey: { type: String },
});

export const ResponseSchema = new mongoose.Schema<IResponse>({
  username: { type: String, required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  apiKey: { type: String },
  timeCreated: { type: Number, default: Date.now(), required: true },
  dateStamp: { type: String, default: new Date().toString(), required: true },
});

export const Quota =
  (mongoose.models.Quota as QuotaModel) ||
  mongoose.model<IQuota, QuotaModel>("Quota", QuotaSchema);

export const Response =
  (mongoose.models.Response as ResponseModel) ||
  mongoose.model<IResponse, ResponseModel>("Response", ResponseSchema);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);
