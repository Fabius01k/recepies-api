import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Prompt} from "../entities/promt.entity";
import {PromptController} from "./prompt.controller";
import {PromptService} from "./prompt.service";

@Module({
    imports: [TypeOrmModule.forFeature([Prompt])],
    controllers: [PromptController],
    providers: [PromptService],
    exports: [PromptService, TypeOrmModule],
})
export class PromptModule {}