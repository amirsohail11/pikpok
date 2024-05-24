module.exports = (mongoose) => {
    const userSchema = new mongoose.Schema(
      {
        userId: {
          type: String,
          unique: true,
        }, 
        user_type: {
          type: String,
        },
        first_name: {
          type: String,
        },
        last_name: {
          type: String,
        },
        full_name: {
          type: String,
        },
        email: {
          type: String,
          unique: true,
        },
        mobile_number: {
          type: String,
          unique: true,
        },
        avatar: {
          type: String,
          default: null,
        },
        dob: {
          type: Date,
        },
        status: {
          type: Boolean,
          enum: [true, false],
          default: true,
        },
        device_type: {
          type: String,
          enum: ["android", "iphone", "web", "Iphone", "ios"],
        },
        device_id: {
          type: String,
        },
        userToken: {
          type: String,
          default: null,
        },
      },
      {
        timestamps: true,
        collection: "users",
      }
    );
    return mongoose.model("User", userSchema);
  };
  