const express = require('express');
const { redirect } = require('react-router-dom');
const router = express.Router();
const DogModel = require('../model/dog');
const HistoryModel = require('../model/formHistory');


let predictedBreed = "";
router.get('/', function (req, res, next) {
  res.render('breed', { title: 'breed' });
});

router.post("/receive-breed", (req, res) => {
  const { predicted_breed ,userID} = req.body;
  console.log(userID)
  console.log("Received predicted breed:", predicted_breed);
  predictedBreed = predicted_breed;
  const results = new HistoryModel({
    predicted_breed: predictedBreed,
    user:userID

  });
  results.save();
  res.status(200).send({ message: "Received successfully", data: predicted_breed });
});


router.get("/getBreed", async (req, res) => {
  try {

    if (!predictedBreed) {
      return res.status(404).send({ message: "No breed found" });
    }

    const dogData = await DogModel.findOne({ breed: predictedBreed });
    if (!dogData) {
      return res.status(404).send({ message: "Breed not found in database" });
    }
    res.render("predictedBreed", {
      predictedBreed: predictedBreed,
      dogs: dogData
    });
  } catch (error) {
    console.error("Error fetching breed data:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

router.get("/history/:id", async (req, res) => {
  const userID = req.params.id
  try {
    const breedHistory = await HistoryModel.find({user:userID}).sort({ _id: -1 });

    if (breedHistory.length === 0) {
      return res.status(404).send({ message: "No breed history available" });
    }

    const dogDataPromises = breedHistory.map(async (entry) => {
      const dog = await DogModel.findOne({ breed: entry.predicted_breed});
      return dog; 
    });

    const dogs = await Promise.all(dogDataPromises);
    res.render("history", { dogs: dogs });

  } catch (error) {
    console.error("Error fetching breed data:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});





module.exports = router;


