const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { authUser, authRole } = require("../auth");
const Switch = require("../models/Switch");

// read all, filter by manufacturer/brand/type, sort by name
router.get("/", authUser, async (req, res) => {
  const { manufacturer, brand, type } = req.query;
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
    if (type) findQuery.type = { $regex: new RegExp(type, "i") };
    let projection = { name: 1, manufacturer: 1, brand: 1, type: 1 };
    let sortQuery = { name: 1 };
    const records = await Switch.find(findQuery, projection).sort(sortQuery);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

// read one by id
router.get("/:switchId", authUser, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.switchId)) {
    res.status(400).json({ error: { message: "Invalid switch id." } });
  } else {
    try {
      const record = await Switch.findById(req.params.switchId, { __v: 0 });
      if (record) res.status(200).json(record);
      else res.status(404).json({ error: { message: "Switch not found." } });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// create one if not exist
router.post("/", authUser, authRole, async (req, res) => {
  const existed = await Switch.exists({ name: req.body.name });
  if (!existed) {
    const s = new Switch({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      brand: req.body.brand,
      type: req.body.type,
      mount: req.body.mount,
      materials: req.body.materials,
      spring: req.body.spring,
      travel: req.body.travel,
    });
    try {
      const record = await s.save();
      record["__v"] = undefined;
      res.status(200).json(record);
    } catch (err) {
      res.status(400).json({
        error: { message: "Required fields missing." },
      });
    }
  } else {
    res.status(400).json({
      error: { message: `Switch named ${req.body.name} exists already.` },
    });
  }
});

// update one by id
router.patch("/:switchId", authUser, authRole, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.switchId)) {
    res.status(400).json({ error: { message: "Invalid switch id." } });
  } else if (await Switch.exists({ name: req.body.name })) {
    res.status(400).json({
      error: { message: `Switch named ${req.body.name} exists already.` },
    });
  } else {
    try {
      const record = await Switch.findByIdAndUpdate(
        req.params.switchId,
        {
          name: req.body.name,
          manufacturer: req.body.manufacturer,
          brand: req.body.brand,
          type: req.body.type,
          mount: req.body.mount,
          materials: req.body.materials,
          spring: req.body.spring,
          travel: req.body.travel,
        },
        { new: true }
      );
      record["__v"] = undefined;
      res.status(200).json(record);
    } catch (err) {
      res.status(404).json({ error: { message: "Switch not found." } });
    }
  }
});

// delete one by id
router.delete("/:switchId", authUser, authRole, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.switchId)) {
    res.status(400).json({ error: { message: "Invalid switch id." } });
  } else {
    try {
      const record = await Switch.findByIdAndRemove(req.params.switchId);
      if (record) res.sendStatus(204);
      else res.status(404).json({ error: { message: "Switch not found." } });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
