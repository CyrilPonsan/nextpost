// @/models.ts
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Expediteur } from "./expediteur";
import { StatutCourrier } from "./statutCourrier";

@Table({
  timestamps: false,
  tableName: "courrier",
})
export class Courrier extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  type!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  bordereau!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  civilite!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  prenom!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nom!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  adresse!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  complement!: string;

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
  telephone!: string;

  @Column({
    type: DataType.BLOB("long"),
    allowNull: true,
  })
  signature!: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  procuration!: string;

  @ForeignKey(() => Expediteur)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  expediteur_id!: number;

  @BelongsTo(() => Expediteur, { as: "expediteur" })
  expediteur!: Expediteur;

  @HasMany(() => StatutCourrier, { as: "statutCourrier" })
  statutCourrier!: StatutCourrier;
}
