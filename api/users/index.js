const { Router } = require("express");
const { check } = require("express-validator");
const { emailExist } = require("../../helpers/customValidators");
const { fieldsValidator } = require("../../middlewares/fieldsValidator");
const { validateJWT } = require("../../middlewares/tokenValidator");
const { handlerCreateUser, handlerAllUsers } = require("./users.controller");

const router = Router();

router.post(
  "/",
  [
    check("email", "email no es valido").isEmail(),
    check("email").custom(emailExist),
    check("password", "El password es obligatorio").exists(),
    check("password", "El password debe ser de minimo 6 caracteres").isLength({
      min: 6,
    }),

    fieldsValidator,
  ],
  handlerCreateUser
);
router.get("/", validateJWT, handlerAllUsers);

module.exports = router;
