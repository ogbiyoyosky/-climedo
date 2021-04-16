import TabController from "./controllers/tab.controller";
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


router.post("/tabs", validate.validateBody(validate.schemas.tab),  TabController.create)

router.put("/tabs/:tabId", validate.validateBody(validate.schemas.tab), TabController.update)

router.delete("/tabs/:tabId", TabController.delete)

router.get("/tabs", TabController.fetch)


export default router;
