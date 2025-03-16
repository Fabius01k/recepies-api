import {Body, Controller, Param, Put} from "@nestjs/common";
import {UpdateUserDto} from "../dto/user.dto";
import {User} from "../entities/user.entity";
import {UserService} from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }
}