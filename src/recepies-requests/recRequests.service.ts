import {Injectable} from "@nestjs/common";
import OpenAI from "openai";
import {PromptService} from "../prompts/prompt.service";


@Injectable()
export class RecRequestsService {
    private openAiKey = process.env.OPENAI_API_KEY;
    private openai: OpenAI;

    constructor(
        private readonly promptService: PromptService
    ) {
        this.openai = new OpenAI({ apiKey: this.openAiKey });
    }

    async requestAI(products: string,promptId: string): Promise<string> {
        try {
            const promptEntity = await this.promptService.getPromptById(promptId);
            const promptTemplate = promptEntity.text;
            const prompt = promptTemplate.replace('${products}', products);

            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            });
            return response.choices[0]?.message?.content || "No response";
        } catch (error) {
            console.error("OpenAI request error:", error);
            throw new Error("Failed to fetch response from OpenAI");
        }
    }
}