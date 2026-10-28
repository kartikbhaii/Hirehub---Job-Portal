
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    { timestamps: true }
)

export default mongoose.models.Job || mongoose.model("Job", jobSchema);

