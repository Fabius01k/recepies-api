import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    dietType?: string;

    @IsOptional()
    @IsString()
    foodRestrictions?: string;

    @IsOptional()
    @IsString()
    allergy?: string;
}
