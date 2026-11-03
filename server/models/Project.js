// MongoDB driver mongoose ko import kiya
import mongoose from 'mongoose';

// Project ka blueprint (schema) ready kar rahe hain
const projectSchema = new mongoose.Schema({
  
  // userId: Ye sabse important hai. Ye batata hai ki ye project kis user ne banaya hai.
  // ref: 'User' ka matlab hai ye pichle wale 'User' model se link/connect ho raha hai (Relational link).
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // projectName: User jo website bana raha hai uska naam (jaise: "My Portfolio").
  projectName: { type: String, required: true },
  
  // promptHistory: Ek array (list) jisme user ke dwara diye gaye saare text prompts save honge. 
  // Isse hume pata chalega user ne step-by-step kya commands diye the.
  promptHistory: [{ type: String }],
  
  // generatedCodeStructure: AI jo actual code likhega (React, CSS files waghera), wo pura folder structure 
  // ek JSON object ke format mein yahan save hoga. By default ye empty object {} rahega.
  generatedCodeStructure: { type: Object, default: {} }

}, 
// Timestamps on rakhne se pata chalega project kab banaya gaya tha aur last kab edit hua.
{ timestamps: true });

// Isko 'Project' model banakar export kar diya.
export default mongoose.model('Project', projectSchema);