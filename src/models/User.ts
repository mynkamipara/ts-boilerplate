import { Document, Model, model, Schema } from 'mongoose';

export interface IUsers extends Document {
  name: string;
  email:string;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    email:{
      type:String,
      unique:true,
    }
  },
  {
    timestamps: true,
  },
);

const Users: Model<IUsers> = model<IUsers>('Users', userSchema);

export default Users;
