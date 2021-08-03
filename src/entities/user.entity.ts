import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { classToPlain, Exclude } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { AbstractEntity } from "./abstract-entity";

// Create table with name 'users'
@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column()
    @IsEmail()
    email: string

    @Column({ unique: true })
    username: string

    @Column()
    @Exclude()
    password: string
    
    @Column({default: ''})
    bio: string

    @Column({default: null, nullable: true})
    image: string | null

    // TODO: Add following

    @BeforeInsert()
    async hasPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async comparePassword(attemptPassword: string) {
        return await bcrypt.compare(attemptPassword, this.password)
    }

    toJSON() {
        return classToPlain(this)
    }
}