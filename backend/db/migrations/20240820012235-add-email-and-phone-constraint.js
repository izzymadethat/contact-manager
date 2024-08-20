"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("PhoneNumbers", {
      fields: ["contact_id", "type"],
      type: "unique",
      name: "unique_contact_phone_type",
    });

    await queryInterface.addConstraint("EmailAddresses", {
      fields: ["contact_id", "type"],
      type: "unique",
      name: "unique_contact_email_type",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint(
      "PhoneNumbers",
      "unique_contact_phone_type"
    );
    await queryInterface.removeConstraint(
      "EmailAddresses",
      "unique_contact_email_type"
    );
  },
};
