const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

router.post("/", saucesCtrl.addSauce);
router.get("/", saucesCtrl.getAllSauces);
router.get("/:id", saucesCtrl.getOneSauce);
router.put("/:id", saucesCtrl.modifySauce);
router.delete("/:id", saucesCtrl.deleteSauce);

module.exports = router;
