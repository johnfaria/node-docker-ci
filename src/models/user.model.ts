import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm'
import { IsAlphanumeric, IsEmail, IsString, Length, IsNotEmpty, IsInt, IsLowercase, Validate } from 'class-validator'
import bcrypt from 'bcryptjs'
import CapitalLetterValidator from "@src/validations/capital-letter.validation";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  @Length(8, 30)
  @IsLowercase()
  @IsAlphanumeric()
  username: string

  @Column({ unique: true })
  @IsEmail()
  @IsLowercase()
  @Length(4, 100)
  email: string

  @Column({ select: false })
  @Length(8, 100)
  @IsString()
  password: string

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Validate(CapitalLetterValidator)
  firstName: string

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Validate(CapitalLetterValidator)
  lastName: string

  @Column()
  @IsInt()
  @IsNotEmpty()
  age: number

  @Column()
  @UpdateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }

  async validatePassword(unencryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(unencryptedPassword, this.password)
  }
}
