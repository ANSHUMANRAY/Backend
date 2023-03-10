const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ContentType, { foreignKey: 'contentTypeId' });
    }
  }
  Content.init({
    contentTypeId: DataTypes.INTEGER,
    entry: DataTypes.JSONB,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};
