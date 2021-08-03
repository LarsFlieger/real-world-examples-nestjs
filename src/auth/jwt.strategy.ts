import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { AuthPayload } from "../models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: process.env.SECRET
        })
    }

    async validate(payload: AuthPayload) {
        const { username } = payload
        const user = this.userRepo.findOne({where: {username}})
        if(!user)
            throw new UnauthorizedException()
        return user
    }
}