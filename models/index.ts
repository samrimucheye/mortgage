import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  income: { type: Number, default: 0 },
  equity: { type: Number, default: 0 },
  propertyValue: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['חדש', 'בתהליך', 'אושר', 'נסגר'],
    default: 'חדש'
  },
  notes: { type: String, default: '' }
}, { timestamps: true });

// Prevent mongoose overwrite error during hot reload
export const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  message: { type: String },
  consent: { type: Boolean, required: true, default: false },
  consentDate: { type: Date },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'converted'],
    default: 'new'
  }
}, { timestamps: true });

export const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
