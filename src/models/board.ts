import {Schema, model} from "mongoose";
import IBoardDocument from "../types/boards";

const boardSchema = new Schema<IBoardDocument>({
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

export default model<IBoardDocument>('Board', boardSchema)