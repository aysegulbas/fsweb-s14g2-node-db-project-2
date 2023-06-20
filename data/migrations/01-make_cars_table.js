/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//up kısmı ilk defa çalıştırıldığında istediğimiz şeyler
exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments();
    tbl.string("vin").notNullable().unique();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.integer("mileage").notNullable();
    tbl.string("title");
    tbl.string("transmission");
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//down geri almak istediğimizde
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
