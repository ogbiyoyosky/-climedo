import { Router } from "express";

import validate from "./middleware/validators/validate";

const router = Router();

router.get("/welcome", (req, res) => {
  return res.status(200).send({
    message: "welcome to the Climedo api",
  });
});

router.get("/", (req, res) => {
  return res.status(200).send({
    message: "welcome to Climedo api",
  });
});





export default router;
