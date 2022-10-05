const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const petsController = require("../controllers/pets");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, petsController.getPet);

router.post("/createPet", upload.single("file"), petsController.createPet);

router.get("/editPet/:id", petsController.editPet);

router.post("/editPet/:id", upload.single("file"), petsController.updatePet);

router.delete("/deletePet/:id", petsController.deletePet);

module.exports = router;
