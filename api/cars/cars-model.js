const db = require("../../data/db-config");
const getAll = () => {
  return db("cars");
};
const getById = (carId) => {
  return db("cars").where("id", carId).first();
};
const getByVin = (carVin) => {
  return db("cars").where("vin", carVin).first();
};

const create = async (carEntity) => {
  const [id] = await db("cars").insert(carEntity);
  //insert array döner
  // var a=[1,2,3,4] var[b]=a dersek 1 yani ilk eleman döner
  return getById(id);
};
const remove = (id) => {
  return db("cars").where("id", id).del();
};
module.exports = { getAll, getById, create, getByVin, remove };
