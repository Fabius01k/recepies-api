import {Prompt} from "../entities/promt.entity";
import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";

@Injectable()
export class PromptService {
    constructor(
        @InjectRepository(Prompt)
        private readonly promptRepository: Repository<Prompt>,
    ) {}

    async getAllPrompts(): Promise<Prompt[]> {
        return await this.promptRepository.find();
    }

    async getPromptById(id: string): Promise<Prompt | null> {
        return await this.promptRepository.findOne({
            where: { id },
        });
    }

    async createPrompt(text: string): Promise<Prompt> {
        const prompt = this.promptRepository.create({ text });
        return await this.promptRepository.save(prompt);
    }

    async updatePrompt(id: string, text: string): Promise<Prompt> {
        const prompt = await this.promptRepository.findOne({ where: { id } });
        if (!prompt) {
            throw new NotFoundException('Prompt not found');
        }

        prompt.text = text;
        return await this.promptRepository.save(prompt);
    }

    async deletePromptById(id: string): Promise<DeleteResult> {
        return await this.promptRepository.delete(id);
    }
}