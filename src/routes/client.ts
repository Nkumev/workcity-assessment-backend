import { Router } from "express";
import { ValidationType, validateDto } from "../middleware/validation";
import { CreateClientDto, UpdateClientDto } from "../dto";
import { clientController } from "../controllers/client";
import { IdDto, ListDto } from "../dto/base";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware.protected);

router.post(
  "/",
  [authMiddleware.admin, validateDto(CreateClientDto)],
  clientController.create
);
router.get(
  "/:id",
  [validateDto(IdDto, ValidationType.PARAMS)],
  clientController.get
);
router.patch(
  "/:id",
  [
    authMiddleware.admin,
    validateDto(IdDto, ValidationType.PARAMS),
    validateDto(UpdateClientDto),
  ],
  clientController.update
);
router.delete(
  "/:id",
  [authMiddleware.admin, validateDto(IdDto, ValidationType.PARAMS)],
  clientController.delete
);
router.get(
  "/",
  [authMiddleware.admin, validateDto(ListDto, ValidationType.QUERY)],
  clientController.list
);

export const clientRouter = router;
