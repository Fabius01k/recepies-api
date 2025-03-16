import {RecRequestsController} from "./recRequests.controller";
import {Module} from "@nestjs/common";
import {RecRequestsService} from "./recRequests.service";
import {PromptService} from "../prompts/prompt.service";
import {PromptModule} from "../prompts/prompt.module";

@Module({
    imports: [PromptModule],
    providers: [RecRequestsService, PromptService],
    controllers: [RecRequestsController],
})
export class RecRequestsModule {}