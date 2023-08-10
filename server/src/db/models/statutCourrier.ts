// @/models.ts
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Courrier } from "./courrier";
import { Statut } from "./statut";
import { Facteur } from "./facteur";

@Table({
  timestamps: false,
  tableName: "statutCourrier",
})
export class StatutCourrier extends Model {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @ForeignKey(() => Statut)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statut_id!: number;

  @BelongsTo(() => Statut, { as: "statut" })
  statut!: Statut;

  @ForeignKey(() => Courrier)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courrier_id!: number;

  @BelongsTo(() => Courrier, { as: "courrier" })
  courrier!: Courrier;

  @ForeignKey(() => Facteur)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  facteur_id!: number;

  @BelongsTo(() => Facteur, { as: "facteur" })
  facteur!: Facteur;
}
