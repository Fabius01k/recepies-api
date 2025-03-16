import {Body, Controller, Post} from "@nestjs/common";
import {RecRequestsService} from "./recRequests.service";

@Controller("request")
export class RecRequestsController {
    constructor(private readonly recRequestsService: RecRequestsService) {}

    @Post()
    async getResponse(@Body("products") products: string, @Body("promptId") promptId: string ): Promise<{ response: string }> {
        const response = await this.recRequestsService.requestAI(products,promptId);
        return { response };
    }
}