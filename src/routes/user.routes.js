import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { veryFyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(veryFyJWT, logoutUser);
router.route("/refresh-token").post(refreshAcessToken);

export default router;
