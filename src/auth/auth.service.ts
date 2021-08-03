import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

    async register(credentials: RegisterDTO) {
        try {
            const user = this.userRepo.create(credentials)
            await user.save()
            return user
        } catch (error) {
            if(error.code === '23505')
                throw new ConflictException('Username has already been taken')

            console.error(error)
            throw new InternalServerErrorException()
        }
    }

    async login({email, password}: LoginDTO) {
        try {
            const user = await this.userRepo.findOne({where: {email}})
            if(user && await user.comparePassword(password))
                return user
            else
                throw new UnauthorizedException()
        } catch (error) {
            console.error(error)
            throw new UnauthorizedException('Invalid credentials')
        }
    }
}
