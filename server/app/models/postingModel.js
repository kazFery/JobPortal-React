module.exports = (sequelize, Sequelize) => {
  const Posting = sequelize.define(
    "postings",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      job_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_description: {
        type: Sequelize.STRING(10000),
        allowNull: false,
      },
      job_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_salary: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      posted_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    },
    {
      timestamps: false,
    }
  );
  
  return Posting;
};
