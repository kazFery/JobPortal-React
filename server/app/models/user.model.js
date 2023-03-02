module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("user", "company", "admin"),
        defaultValue: "user",
      },
      // resume:Sequelize.STRING, nullable
      resume: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Date of Upload resume
      resumeDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // Full name / Company name
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
};
