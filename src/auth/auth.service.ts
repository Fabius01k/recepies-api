import {Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        protected jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async createAccessToken(login: string): Promise<string> {
        const payload = { login: login };
        return this.jwtService.sign(payload, { expiresIn: '30d' });
    }

    async validateLoginUser(login: string, password: string): Promise<void> {
        const envLogin = this.configService.get<string>('USER_LOGIN');
        const envPasswordHash = this.configService.get<string>('USER_PASSWORD');

        if (login !== envLogin) {
            throw new UnauthorizedException('Неверный логин или пароль');
        }

        const isPasswordValid = await bcrypt.compare(password, envPasswordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный логин или пароль');
        }
    }
}