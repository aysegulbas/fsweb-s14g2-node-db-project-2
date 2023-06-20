const { json } = require("express");
const carModel = require("./cars-model");
var vinValidator = require("vin-validator");
const checkCarId = async (req, res, next) => {
  try {
    const isExistCar = await carModel.getById(req.params.id);
    if (!isExistCar) {
      res.status(404).json({
        message: `${req.params.id} kimliğine sahip araba bulunamadı.`,
      });
    } else {
      req.existCar = isExistCar;
      //tekrar roota dönmesin diye değişkene atadık,
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    const allRequiredFields = ["vin", "make", "model", "mileage"]; //required alanları yazdık.zorunlu olup boş gelenlere hata vermeli
    const missingFields = [];
    //her bir zorunlu alanı teker teker dolu mu boş mu yerine for let döngüsü kullandık
    for (let i = 0; i < allRequiredFields.length; i++) {
      const item = allRequiredFields[i];
      if (!req.body[item]) {
        //i.değer boşsa
        missingFields.push(item);
      }
    }
    if (missingFields.length > 0) {
      res.status(400).json({
        //toString() virgül ile arrayı parçalar
        message: `${missingFields.toString()} ${
          missingFields.length == 1 ? "is" : "are"
        } missing`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    let isValidVin = vinValidator.validate(req.body.vin);
    //yukardakini vinin websitesinden  aldık
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const isExistVin = await carModel.getByVin(req.body.vin);
    if (isExistVin) {
      res.status(400).json({
        message: `vin ${req.body.vin} already exists`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
