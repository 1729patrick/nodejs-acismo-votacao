module.exports = {
  username: 'postgres',
  password: 'root',
  database: 'votacao',
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false,
    underscored: true,
    undescoredAll: true,
  },
};
