import { InferSchemaType, model, Schema } from "mongoose";

const userShema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, select: false},
    password: {type: String, required: true, select: false}
})

type User = InferSchemaType<typeof userShema>
export default model<User>("User", userShema)