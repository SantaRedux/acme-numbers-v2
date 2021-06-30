const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db_numbers');

const { INTEGER } = Sequelize.DataTypes;

const Winner = conn.define('winner', {
  num: INTEGER
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Promise.all([
    Winner.create({ num: 1}),
    Winner.create({ num: 2}),
    Winner.create({ num: 3}),
    Winner.create({ num: 4}),
    Winner.create({ num: 5})
  ]);
};

module.exports = {
  syncAndSeed,
  models: {
    Winner
  }
};
