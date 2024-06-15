const express = require("express");
const Event = require("../models/EventModule");
const router = express.Router(); // mini application/instance routes
const { isLoggedIn, isMovieDelete, isContributor } = require("../middleware"); // conditional rendering
const Review = require("../models/Review");

//router provides the instance by which we can send requests

router.get("/event/", isLoggedIn, async (req, res) => {
  let event = await Event.find({}); // promise
  res.render("event/index", { event });
});

router.get("/event/new", isLoggedIn, (req, res) => {
  res.render("event/new");
});

// ACTUALLY ADDING IN THE DATABASE
router.post("/event/", isLoggedIn, isContributor, async (req, res) => {
  let { name, img, eventdate, eventTime, desc, eventLink, review } = req.body;
  await Event.create({
    name,
    img,
    eventdate,
    eventTime,
    desc,
    eventLink,
    review,
    author: req.user._id,
  });
  res.redirect("/event");
});

// TO SHOW A PARTICULAR Movie
router.get("/event/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let foundMovie = await Event.findById(id).populate("review");
  res.render("event/show", { foundMovie });
});

// FORM TO EDIT A PARTIICULAR Movie
router.get("/event/:id/edit", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let foundMovie = await Event.findById(id);
  res.render("event/edit", { foundMovie });
});

// TO ACTUALLY CHANGE IN db
router.patch("/event/:id", isLoggedIn, isMovieDelete, async (req, res) => {
  let { id } = req.params;
  let { name, img, year, desc } = req.body;
  await Event.findByIdAndUpdate(id, { name, img, year, desc });
  res.redirect(`/event/${id}`);
});


// DELETE THE EXISTING PRODUCT
router.delete("/event/:id", isLoggedIn, isMovieDelete, async (req, res) => {
  let { id } = req.params;
  let event = await Event.findById(id);

  for (let idd of event.review) {
    await Review.findByIdAndDelete(idd);
  }

  await Event.findByIdAndDelete(id);
  res.redirect("/event");
});

module.exports = router;
