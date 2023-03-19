import {Schema} from "mongoose";

export default interface IBoard {
    title: string
    created: Date
    updated: Date
    userId: Schema.Types.ObjectId
}

export default interface IBoardDocument extends Document {}