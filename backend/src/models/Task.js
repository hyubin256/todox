import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },
  completedAt: {
    type: Date,
    default: null,
  }
},
  { timestamps: true } //Mongoose sẽ tự động thêm createdAt và updatedAt
);

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Trảo đổi _id thành id nếu muốn
    delete ret._id;   // Xoá _id gốc
    delete ret.__v;   // Xoá __v
    delete ret.completeAt; // Xoá trường cũ (legacy field) nếu có từ trước
    return ret;
  }
});

export default mongoose.model("Task", taskSchema);
