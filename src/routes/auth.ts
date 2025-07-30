import { Router } from "express";
import { authController } from "../controllers/auth";
import { validateDto } from "../middleware/validation";
import { LoginDto, SignupDto } from "../dto";

const router = Router();

router.post("/signup", validateDto(SignupDto), authController.signup);
router.post("/login", validateDto(LoginDto), authController.login);

export const authRouter = router;
