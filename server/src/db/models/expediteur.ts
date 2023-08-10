// @/models.ts
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Courrier } from "./courrier";

@Table({
  timestamps: true,
  tableName: "expediteur",
})
export class Expediteur extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nom!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  prenom!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  adresse!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  roles!: Array<string>;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  complement?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  codePostal!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ville!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  telephone?: string;

  @HasMany(() => Courrier, { foreignKey: "expediteur_id" })
  courriers!: Courrier[];
}
