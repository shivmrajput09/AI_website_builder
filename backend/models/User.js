// Mongoose library ko import kar rahe hain MongoDB se interact karne ke liye
import mongoose from 'mongoose';

// User ka data structure (schema) define kar rahe hain
const userSchema = new mongoose.Schema({
  
  // clerkId: Clerk authentication se aane wali unique ID. 
  // required: true (ye zaroori hai), unique: true (kisi aur user se match nahi honi chahiye)
  clerkId: { type: String, required: true, unique: true },
  
  // email: User ka email address. Ye bhi lazmi aur sabse alag hona chahiye.
  email: { type: String, required: true, unique: true },
  
  // name: User ka naam (Clerk se fetch karke yahan save karenge).
  name: { type: String },
  
  // credits: User ke paas AI se code generate karne ke kitne attempts bache hain. 
  // default: 10 matlab naye user ko by default 10 free credits milenge.
  credits: { type: Number, default: 10 },
  
  // subscriptionTier: User free plan use kar raha hai ya paid. 
  // enum: ye ensure karta hai ki 'free' aur 'pro' ke alawa koi aur spelling mistake ya galat value save na ho jaye.
  subscriptionTier: { type: String, default: 'free', enum: ['free', 'pro'] }

}, 
// { timestamps: true } automatically database mein 'createdAt' aur 'updatedAt' ki date save kar deta hai.
{ timestamps: true });

// Is schema ko 'User' model banakar export kar rahe hain taaki controllers isko use kar sakein.
export default mongoose.model('User', userSchema);