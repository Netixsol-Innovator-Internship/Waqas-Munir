import multer from "multer";

import { Router } from "express";
import {
  createGrocery,
  deleteGrocery,
  getGroceries,
  getGrocery,
  updateGrocery,
} from "../controllers/grocery.js";
import { authorize } from "../middlewares/authorize.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  groceryValidations,
  updateGroceryValidations,
} from "../validations/index.js";

const router = Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get("/", getGroceries);

router.post(
  "/",
  authenticate,
  authorize,
  upload.single("image"),
  groceryValidations,
  createGrocery
);

router.get("/:id", getGrocery);

router.patch(
  "/:id",
  authenticate,
  authorize,
  upload.single("image"),
  updateGroceryValidations,
  updateGrocery
);

router.delete("/:id", authenticate, authorize, deleteGrocery);

export { router as groceryRoutes };
