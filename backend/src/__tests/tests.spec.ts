import tab from "./tab.spartial";
import TabModel from "../models/Tab";

(async function () {
  console.log("clearingusers table");
  await TabModel.deleteMany({});
})();

tab();
