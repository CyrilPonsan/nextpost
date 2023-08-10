// @/models.ts
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { StatutCourrier } from "./statutCourrier";

@Table({
  timestamps: false,
  tableName: "statut",
})
export class Statut extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  etat!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statutCode!: number;

  @HasMany(() => StatutCourrier, { foreignKey: "statut_id" })
  statutCourriers!: StatutCourrier[];
}
