module.exports = (mongoose) => {
  const counterSchema = new mongoose.Schema(
    {
      id: {
        type: String,
        unique: true,
      },
      sequence_value: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
      collection: "counters",
    }
  );
  return mongoose.model("Counter", counterSchema);
};
