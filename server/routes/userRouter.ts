import { Router } from "express";
import { login, signup } from "../controllers/userController";
import {
  userLoginValidator,
  userSignupValidator,
} from "../validators/authValidator";

const router = Router();

router.post("/signup", userSignupValidator, signup);
router.post("/login", userLoginValidator, login);

export default router;
