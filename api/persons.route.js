// persons.route.js

const express = require("express");
const personRoutes = express.Router();

// Require Business model in our routes module
let Person = require("./persons.model");
const { wait } = require("@testing-library/user-event/dist/utils");

// Defined store route
personRoutes.route("/add").post(function (req, res) {
  let person = new Person(req.body);
  person
    .save()
    .then((person) => {
      res.status(200).json({ person: "person in added successfully" });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
personRoutes.route("/").get(async function (req, res) {
  const allPerson = await Person.find();
  res.json(allPerson);
});

// personRoutes.route("/").get(function (req, res) {
//   Person.find(function (err, persons) {
//     if (err) {
//       console.log(err);
//       console.log("Lỗi rồi cụ ợ");
//     } else {
//       res.json(persons);
//     }
//   });
// });

// Defined edit route
// personRoutes.route("/edit/:id").get(function (req, res) {
//   let id = req.params.id;
//   Person.findById(id, function (err, business) {
//     res.json(business);
//   });
// });

personRoutes.route("/edit/:id").get(async function (req, res) {
  let id = req.params.id;
  const p = await Person.findById(id);
  res.json(p);
});

//  Defined update route
personRoutes.route("/update/:id").post(async function (req, res) {
  let id = req.params.id;
  const p = await Person.findById(id);
  if (!p) res.status(404).send("data is not found");
  else {
    console.log(p);
    p.name = req.body.name;
    p.company = req.body.company;
    p.age = req.body.age;

    p.save()
      .then((person) => {
        res.json("Update complete");
      })
      .catch((err) => {
        res.status(400).send("unable to update the database");
      });
  }
});
// personRoutes.route("/update/:id").post(function (req, res) {
//   Person.findById(req.params.id, function (err, person) {
//     if (!person) res.status(404).send("data is not found");
//     else {
//       console.log(person);
//       person.name = req.body.name;
//       person.company = req.body.company;
//       person.age = req.body.age;

//       person
//         .save()
//         .then((business) => {
//           res.json("Update complete");
//         })
//         .catch((err) => {
//           res.status(400).send("unable to update the database");
//         });
//     }
//   });
// });

// Defined delete | remove | destroy route
personRoutes.route("/delete/:id").get(async function (req, res) {
  try {
    await Person.findByIdAndRemove(req.params.id);
    res.json("Successfully removed");
  } catch (err) {
    res.json(err);
  }
});

// personRoutes.route("/delete/:id").get(function (req, res) {
//   Person.findByIdAndRemove({ _id: req.params.id }, function (err, person) {
//     if (err) res.json(err);
//     else res.json("Successfully removed");
//   });
// });

module.exports = personRoutes;
