const cloudinary = require("../middleware/cloudinary");
const Pet = require("../models/Pet");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const pets = await Pet.find({ user: req.user.id });
      res.render("profile.ejs", { pets: pets, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const pets = await Pet.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { pets: pets });
    } catch (err) {
      console.log(err);
    }
  },
  getPet: async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id);
      res.render("pet.ejs", { pet: pet, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPet: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Pet.create({
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        animalType: req.body.animalType,
        allergies: req.body.allergies,
        meds: req.body.meds,
        treats: req.body.treats,
        careType: req.body.careType,
        frequency: req.body.frequency,
        notes: req.body.notes,
        user: req.user.id,
      });
      console.log("Pet has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deletePet: async (req, res) => {
    try {
      // Find pet by id
      let pet = await Pet.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(pet.cloudinaryId);
      // Delete pet from db
      await Pet.remove({ _id: req.params.id });
      console.log("Deleted Pet");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
