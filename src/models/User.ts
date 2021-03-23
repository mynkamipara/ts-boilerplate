import { Document, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const SALT_WORK_FACTOR = 10;

export interface IUsers extends Document {
  name: string;
  email: string;
  password:string;
	comparePassword(password: string): boolean;
}

var userSchema: any = new Schema(
  {
    name: {
      type: String,
    },
    email:{
      type:String,
      unique:true,
    },
    password:{
      type:String
    }
  },
  {
    timestamps: true,
  },
);



userSchema.pre('save', async function(next){
	const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
	let encryptPassword = await bcrypt.hash(this.password, salt);
	this.password = encryptPassword;
	next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  console.log(candidatePassword)
  let checkPassword = await bcrypt.compare(candidatePassword,this.password);
  return checkPassword;
};


const Users: Model<IUsers> = model<IUsers>('Users', userSchema);

export default Users;
