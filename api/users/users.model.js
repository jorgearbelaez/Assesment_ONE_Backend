const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    universidad: {
      type: String,
      trim: true,
    },
    titulo: {
      type: String,
      trim: true,
    },
    promedio: {
      type: String,
      trim: true,
    },
    carrera: {
      type: String,
      trim: true,
    },

    rol: {
      type: String,
      required: true,
      enum: ["ADMIN", "USUARIO"],
      default: "USUARIO",
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// hashear los password con el hook de pre de mongoose
UserSchema.pre("save", async function (next) {
  // si esta modificado el password que pase al siguiente Middleware
  if (!this.isModified("password")) next();

  const sal = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, sal);
});

UserSchema.methods.comprobarPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

module.exports = mongoose.model("User", UserSchema);
