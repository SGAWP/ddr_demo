module.exports = (sequelize, Sequelize) => {
	const Spr_Operation = sequelize.define('spr_operations', {
		operation_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		operation_full_name: {
			type: Sequelize.STRING(500),
			allowNull: false
		},
		operation_short_name: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		group_name: {
			type: Sequelize.STRING(200),
			allowNull: true
		}
	},
		{
			timestamps: false,
			hierarchy: true
		}
	);
	return Spr_Operation;
}
