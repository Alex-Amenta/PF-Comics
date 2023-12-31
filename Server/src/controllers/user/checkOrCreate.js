const { User } = require("../../db");

const checkOrCreate = async (name, email, image, password) => {
	if (!name || !email) throw new Error("Name and email are required");

	try {
		const user = await User.findOrCreate({
			where: {
				email: email,
			},
			defaults: {
				name: name,
				email: email,
				image: image,
				password: password,
				active: true,
				verified: true,
			},
		});
		return user[0]; // [user, created]
	} catch (error) {
		console.log(error);
	}
};

module.exports = checkOrCreate;
