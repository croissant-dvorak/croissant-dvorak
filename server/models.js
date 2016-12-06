var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var QueryPlugin = require('mongoose-query');

var projectSchema = mongoose.Schema({
  //Proj_id: int()  generated by mongo
  name: String,

    lat : Number,
    long : Number,
  
  street : String,
    street2 : String,
    zip: Number,
    city: String,
    state: String,
    country: String,
  description : String,
  owner : mongoose.Schema.ObjectId,
  startDate : Date,
  compDate : Date,
  pictureData: Buffer,
  pictureOriginalName: String,
  mimetype: String


});

projectSchema.plugin(QueryPlugin);
projectSchema.plugin(findOrCreate);
exports.Project = mongoose.model('Project', projectSchema);

var CommentSchema = mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  userName: String,
  projectId: mongoose.Schema.ObjectId,
  textData: String,
  date: Date
});

CommentSchema.plugin(findOrCreate);
exports.Comment = mongoose.model('Comment', CommentSchema);

var userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  facebookId: String
});

userSchema.plugin(findOrCreate);
exports.User = mongoose.model('User', userSchema);

var sessionSchema = mongoose.Schema({
  sessionId: String,
  userId: mongoose.Schema.ObjectId
});

sessionSchema.plugin(findOrCreate);
exports.Session = mongoose.model('Session', sessionSchema);
