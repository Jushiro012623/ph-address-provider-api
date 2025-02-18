import User from '../src/module/users/userModel'; // Import the User model

(async () => {
    // await db.sequelize().sync({ force: true });
    await User.sync({ force: true });
    console.log('The table for the User model was just (re)created!');
})();