import {Body, Controller, Delete, Get, Param, Post, Put, Res} from "@nestjs/common";
import {PromptService} from "./prompt.service";
import { Response } from 'express';


@Controller('prompt')
export class PromptController {
    constructor(private readonly promptService: PromptService) {}

    @Get()
    async getAllPrompts(@Res() res: Response) {
        const prompts = await this.promptService.getAllPrompts();
        if (!prompts || prompts.length === 0) {
            return res.status(404).json({ error: 'No prompts found.' });
        }
        return res.json(prompts);
    }

    @Get('/:id')
    async getPromptById(@Param('id') id: string, @Res() res: Response) {
        const prompt = await this.promptService.getPromptById(id);
        if (!prompt) {
            return res.status(404).json({ error: `Prompt with id ${id} not found.` });
        }
        return res.json(prompt);
    }

    @Post()
    async createPrompt(@Body() body: { text: string }, @Res() res: Response) {
        const { text } = body;

        if (!text) {
            return res.status(400).json({ error: 'Prompt text is required.' });
        }

        const newPrompt = await this.promptService.createPrompt(text);
        return res.status(201).json(newPrompt);
    }

    @Put('/:id')
    async updatePrompt(
        @Param('id') id: string,
        @Body() body: { text: string },
        @Res() res: Response,
    ) {
        const { text } = body;

        if (!text) {
            return res.status(400).json({ error: 'Prompt text is required.' });
        }

        try {
            const updatedPrompt = await this.promptService.updatePrompt(id, text);
            return res.json(updatedPrompt);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    @Delete('/:id')
    async deletePrompt(@Param('id') id: string, @Res() res: Response) {
        const deleteResult = await this.promptService.deletePromptById(id);
        if (!deleteResult.affected) {
            return res.status(404).json({ error: `Prompt not found.` });
        }
        return res.json({ message: `Prompt successfully deleted.` });
    }
}