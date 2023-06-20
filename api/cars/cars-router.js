const router = require("express").Router();
const carModel = require("./cars-model");
const mw = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    res.json(await carModel.getAll());
  } catch (error) {
    next(error);
  }
});
router.get("/:id", mw.checkCarId, (req, res, next) => {
  try {
    res.json(req.existCar);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  mw.checkCarPayload,
  mw.checkVinNumberValid,
  mw.checkVinNumberUnique,
  async (req, res, next) => {
    try {
      res.status(201).json(await carModel.create(req.body));
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", mw.checkCarId, async (req, res, next) => {
  try {
    await carModel.remove(req.params.id);
    res.json({ message: `${req.params.id} has been deleted` });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
