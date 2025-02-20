import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String,
});

const ImageModel = mongoose.model("Image", ImageSchema);

export default ImageModel; // Use `export default` for ES Modules