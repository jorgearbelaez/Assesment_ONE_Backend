const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator } = require("../../middlewares/fieldsValidator");
const { handlerLogin } = require("./local.controller");

const router = Router();

router.post(
  "/",
  [
    check("email", "email is not valid").isEmail(),
    check("password", "password is required").not().isEmpty(),
    fieldsValidator,
  ],
  handlerLogin
);

module.exports = router;
