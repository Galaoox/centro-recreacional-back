import { Roles } from '@entities/roles.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([Roles])],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
