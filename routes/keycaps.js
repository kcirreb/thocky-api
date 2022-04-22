const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { authUser, authRole } = require("../auth");
const Keycap = require("../models/Keycap");

// read all, filter by manufacturer/brand/profile/material, sort by name
router.get("/", authUser, async (req, res) => {
  const { manufacturer, brand, profile, material } = req.query;
  try {
    let findQuery = {};
    if (manufacturer)
      findQuery.manufacturer = {
        $regex: new RegExp("^" + manufacturer.replaceAll("-", " ") + "$", "i"),
      };
    if (brand)
      findQuery.brand = {
        $regex: new RegExp("^" + brand.replaceAll("-", " ") + "$", "i"),
      };
    if (profile) findQuery.profile = { $regex: new RegExp(profile, "i") };
    if (material) findQuery.material = { $regex: new RegExp(material, "i") };
    let projection = {
      name: 1,
      manufacturer: 1,
      brand: 1,
      profile: 1,
      material: 1,
    };
    let sortQuery = { name: 1 };
    const records = await Keycap.find(findQuery, projection).sort(sortQuery);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

// read one by id
router.get("/:keycapsId", authUser, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.keycapsId)) {
    res.status(400).json({ error: { message: "Invalid keycaps id." } });
  } else {
    try {
      const record = await Keycap.findById(req.params.keycapsId, { __v: 0 });
      if (record) res.status(200).json(record);
      else res.status(404).json({ error: { message: "Keycaps not found." } });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// create one if not exist
router.post("/", authUser, authRole, async (req, res) => {
  const existed = await Keycap.exists({ name: req.body.name });
  if (!existed) {
    const k = new Keycap({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      brand: req.body.brand,
      designer: req.body.designer,
      profile: req.body.profile,
      material: req.body.material,
      legends: req.body.legends,
    });
    try {
      const record = await k.save();
      record["__v"] = undefined;
      res.status(200).json(record);
    } catch (err) {
      res.status(400).json({
        error: { message: "Required fields missing." },
      });
    }
  } else {
    res.status(400).json({
      error: { message: `Keycaps named ${req.body.name} exists already.` },
    });
  }
});

// update one by id
router.patch("/:keycapsId", authUser, authRole, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.keycapsId)) {
    res.status(400).json({ error: { message: "Invalid keycaps id." } });
  } else if (await Keycap.exists({ name: req.body.name })) {
    res.status(400).json({
      error: { message: `Keycaps named ${req.body.name} exists already.` },
    });
  } else {
    try {
      const record = await Keycap.findByIdAndUpdate(
        req.params.keycapsId,
        {
          name: req.body.name,
          manufacturer: req.body.manufacturer,
          brand: req.body.brand,
          designer: req.body.designer,
          profile: req.body.profile,
          material: req.body.material,
          legends: req.body.legends,
        },
        { new: true }
      );
      record["__v"] = undefined;
      res.status(200).json(record);
    } catch (err) {
      res.status(404).json({ error: { message: "Keycaps not found." } });
    }
  }
});

// delete one by id
router.delete("/:keycapsId", authUser, authRole, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.keycapsId)) {
    res.status(400).json({ error: { message: "Invalid keycaps id." } });
  } else {
    try {
      const record = await Keycap.findByIdAndRemove(req.params.keycapsId);
      if (record) res.sendStatus(204);
      else res.status(404).json({ error: { message: "Keycaps not found." } });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
