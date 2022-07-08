'use strict';

const { User } = require("../models");


module.exports = {
  async up (queryInterface, Sequelize) {
    await User.create({
    fullName:"ivan",  
    email:"ivan@gmail.com",
    password:"$2b$12$oxxELp3yWS4conIll11S5OMwVrbwxc8s4kR6ldSuChLPH5XyjMgWK",
    status:"ADMIN"
    }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
