import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class Assessment extends Model<
InferAttributes<Assessment>,
InferCreationAttributes<Assessment>
> {
  declare public id: CreationOptional<number>;
  declare public instrumentType: string;
  declare public score: number;
  declare public riskLevel: string;
  declare public catName: string;
  declare public catDob: string;
  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  declare public deletedAt: Date | null;

  public static initModel(sequelize: Sequelize): typeof Assessment {
    Assessment.init({
      catDob: {
        allowNull: false,
        field: `cat_date_of_birth`,
        type: DataTypes.DATE,
      },
      catName: {
        allowNull: false,
        field: `cat_name`,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        field: `created_at`,
        type: DataTypes.DATE,
      },
      deletedAt: {
        field: `deleted_at`,
        type: DataTypes.DATE,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        autoIncrementIdentity: true,
        field: `id`,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      instrumentType: {
        allowNull: false,
        field: `instrument_type`,
        type: DataTypes.STRING,
      },
      riskLevel: {
        allowNull: false,
        field: `risk_level`,
        type: DataTypes.STRING,
      },
      score: {
        allowNull: false,
        field: `score`,
        type: DataTypes.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        field: `updated_at`,
        type: DataTypes.DATE,
      },
    }, {
      paranoid: false,
      sequelize,
      tableName: `assessments`,
      timestamps: true,
    });
    return Assessment;
  }
}
