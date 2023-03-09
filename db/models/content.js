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
      this.belongsTo(models.ContentType, { foreignKey: 'ContentTypeId' });
    }
  }
  Content.init({
    ContentTypeId: DataTypes.INTEGER,
    entry: DataTypes.JSONB,
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};
