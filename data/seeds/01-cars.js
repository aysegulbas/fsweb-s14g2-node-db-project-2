/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const defaultcars = [
  {
    vin: "123",
    make: "Toyota",
    model: "Corolla",
    mileage: 1234,
  },
  {
    vin: "1234",
    make: "Volkwagen",
    model: "Polo",
    mileage: 1234,
  },
  {
    vin: "12345",
    make: "Volkwagen",
    model: "Golf",
    mileage: 1234,
  },
  {
    vin: "123456",
    make: "Seat",
    model: "Leon",
    mileage: 1234,
  },
  {
    vin: "1234567",
    make: "audi",
    model: "A3",
    mileage: 1234,
  },
];
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").truncate();
  //del datadan siliyor, id'si hafızada kalıyor,truncate metadatadan siliyor, o id tekrar verilebilir
  await knex("cars").insert(defaultcars);
};
