import {AuthService} from "./auth.service";
import {Module} from "@nestjs/common";
import {User} from "../entities/user.entity";
import {AuthController} from "./auth.controller";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}