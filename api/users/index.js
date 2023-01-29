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
    check("email", "email is not valid").isEmail(),
    check("email").custom(emailExist),
    check("password", "pasword is required").exists(),
    check("password", "password must be greater than 6 characters").isLength({
      min: 6,
    }),

    fieldsValidator,
  ],
  handlerCreateUser
);
router.get("/", validateJWT, handlerAllUsers);

module.exports = router;
