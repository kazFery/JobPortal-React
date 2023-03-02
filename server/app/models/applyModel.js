module.exports = (sequelize, Sequelize) => {
  const Apply = sequelize.define(
    "applyings",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      posting_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apply_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    },
    {
      timestamps: false,
    }
  );
  return Apply;
};
