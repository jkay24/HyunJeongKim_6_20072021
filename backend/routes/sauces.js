const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");

router.post("/", auth, saucesCtrl.addSauce);
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);

module.exports = router;
