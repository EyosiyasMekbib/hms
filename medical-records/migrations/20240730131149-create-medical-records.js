'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MedicalRecords', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      patientId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      doctorId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      visitDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      diagnosis: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      treatment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MedicalRecords');
  }
};
