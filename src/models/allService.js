import mongoose from "mongoose";
const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgName: {
    type: String,
    required: true,
  },
});
const Services = mongoose.model("allServices", servicesSchema);

export default Services;
