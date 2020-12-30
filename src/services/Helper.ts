import bcrypt from 'bcryptjs';

// Generate activation hash
export function genHash(maxRange = 99999999, saltSync = 5) {
	const salt = bcrypt.genSaltSync(saltSync);
	const random = Math.floor(Math.random() * maxRange * 54) + 2; // Cause, it an return 0, hence we are adding 2 as fail safe
	return bcrypt.hashSync(random.toString(), salt);
}