import { Router } from "express";
import * as usersController from "./users.controller.js";

const router = Router();

router.get("/all", usersController.getUsers);

export default router;