const mongoose = require("mongoose");

// schema

const playListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ctype: String,
  videos: Number,
  author: String,
  active: Boolean,

  date: {
    type: Date,
    default: Date.now,
  },
});

// define a model
const PlayListModel = new mongoose.model("PlayList", playListSchema);

// create a document or insert value
const createDocument = async () => {
  try {
    const jsPlaylist = new PlayListModel({
      name: "JavaScript",
      ctype: "Front End",
      videos: 250,
      author: "Brendan Eich ",
      active: false,
    });

    const mongodbPlaylist = new PlayListModel({
      name: "MongoDB",
      ctype: "Database",
      videos: 250,
      author: "John Doe",
      active: true,
    });

    const mongoosePlaylist = new PlayListModel({
      name: "Mongoose",
      ctype: "Third party library for connection",
      videos: 20,
      author: "None ",
      active: false,
    });

    const result = await PlayListModel.insertMany([
      jsPlaylist,
      mongodbPlaylist,
      mongoosePlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(`create Document Error is : ${err}`);
  }
};

// createDocument();

// Read data
const readData = async () => {
  try {
    const result = await PlayListModel.find({
      ctype: { $nin: ["FullStack", "Front End"] },
    });

    console.log(result);
  } catch (err) {
    console.log(`Read data Error : ${err}`);
  }
};

readData();

// connect with database
mongoose
  .connect("mongodb://localhost:27017/ttchannel")
  .then(() => console.log("connection successful 👍"))
  .catch((e) => console.log("connection error : " + e));
