import express from "express";
import { userController } from "../controllers/user";
import { validateDto, ValidationType } from "../middleware/validation";
import { ListDto } from "../dto/base";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.use(authMiddleware.protected);

/* GET users listing. */
router.get(
  "/",
  [authMiddleware.admin, validateDto(ListDto, ValidationType.QUERY)],
  userController.list
);

export const usersRouter = router;
