import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { projectController } from "../controllers/project";
import { validateDto, ValidationType } from "../middleware/validation";
import { CreateProjectDto } from "../dto";
import { ListDto } from "../dto/base";
import { IdDto } from "../dto/base";
import { UpdateProjectDto, UpdateProjectStatusDto } from "../dto/project";

const router = Router();

router.use(authMiddleware.protected);

router.post(
  "/",
  [authMiddleware.admin, validateDto(CreateProjectDto)],
  projectController.create
);

router.get(
  "/",
  [validateDto(ListDto, ValidationType.QUERY)],
  projectController.list
);

router.get(
  "/:id",
  [validateDto(IdDto, ValidationType.PARAMS)],
  projectController.get
);

router.patch(
  "/status/:id",
  [
    validateDto(IdDto, ValidationType.PARAMS),
    validateDto(UpdateProjectStatusDto),
  ],
  projectController.updateStatus
);

router.patch(
  "/:id",
  [
    authMiddleware.admin,
    validateDto(IdDto, ValidationType.PARAMS),
    validateDto(UpdateProjectDto),
  ],
  projectController.update
);

router.delete(
  "/:id",
  [authMiddleware.admin, validateDto(IdDto, ValidationType.PARAMS)],
  projectController.delete
);

export const projectRouter = router;
