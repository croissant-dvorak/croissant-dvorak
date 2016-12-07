const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const projectSchema = mongoose.Schema({
  name: String,
  lat: Number,
  long: Number,
  street: String,
  street2: String,
  zip: Number,
  city: String,
  state: String,
  country: String,
  description: String,
  owner: mongoose.Schema.ObjectId,
  startDate: String,
  compDate: String,
  pictureData: Buffer,
  pictureOriginalName: String,
  mimetype: String,
}, { timestamps: {} });

projectSchema.plugin(findOrCreate);
exports.Project = mongoose.model('Project', projectSchema);

const CommentSchema = mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  userName: String,
  projectId: mongoose.Schema.ObjectId,
  textData: String,
  date: Date,
}, { timestamps: { createdAt: 'created_at' } });

CommentSchema.plugin(findOrCreate);
exports.Comment = mongoose.model('Comment', CommentSchema);

const userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
}, { timestamps: { createdAt: 'created_at' } });

userSchema.plugin(findOrCreate);
exports.User = mongoose.model('User', userSchema);

const sessionSchema = mongoose.Schema({
  session: String,
  userId: mongoose.Schema.ObjectId,
}, { timestamps: { createdAt: 'created_at' } });

sessionSchema.plugin(findOrCreate);
exports.Session = mongoose.model('Session', sessionSchema);
