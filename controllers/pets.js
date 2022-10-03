const cloudinary = require("../middleware/cloudinary");
const Pet = require("../models/Pet");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const pets = await Pet.find({ user: req.user.id });
      res.render("profile.ejs", { pets: pets, user: req.user, page: "profile" });
    } catch (err) {
      console.log(err);
    }
  },
  getClients: async (req, res) => {
    try {
      const pets = await Pet.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
      res.render("clients.ejs", { pets: pets, user: req.user, page: "clients"});
    } catch (err) {
      console.log(err);
    }
  },
  getPet: async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id);
      res.render("pet.ejs", { pet: pet, user: req.user, page: "pet" });
    } catch (err) {
      console.log(err);
    }
  },

  addNewPet: async (req, res) => {
    try {
      const pets = await Pet.find({ user: req.user.id });
      res.render("newPet.ejs", { pets: pets, user: req.user, page: "newPet" });
    } catch (err) {
      console.log(err);
    }
  },

  createPet: async (req, res) => {
    try {
      const petData = {
        name: req.body.name,
        animalType: req.body.animalType,
        allergies: req.body.allergies,
        meds: req.body.meds,
        treats: req.body.treats,
        careType: req.body.careType,
        frequency: req.body.frequency,
        notes: req.body.notes,
        user: req.user.id,
      }
      if (req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        petData.image = result.secure_url;
        petData.cloudinaryId = result.public_id
      }
      await Pet.create(petData);
     
      console.log("Pet has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  editPet: async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id);
      res.render("editPet.ejs", { pet: pet, user: req.user, page: "editPet" });
    } catch (err) {
      console.log(err);
    }
  },

  updatePet: async (req, res) => {
    try {
      let pet = await Pet.findById({ _id: req.params.id });
      const petData = {
        name: req.body.name,
        animalType: req.body.animalType,
        allergies: req.body.allergies,
        meds: req.body.meds,
        treats: req.body.treats,
        careType: req.body.careType,
        frequency: req.body.frequency,
        notes: req.body.notes,
        user: req.user.id,
      }
      if (req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        petData.image = result.secure_url;
        petData.cloudinaryId = result.public_id
      }
      await Pet.findOneAndUpdate({_id:req.params.id}, petData);
     
      console.log("Pet has been updated!");
      res.redirect("/pet/<%= pet.id %>");
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
