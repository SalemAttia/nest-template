import {  DocumentBuilder } from '@nestjs/swagger';

export const options = new DocumentBuilder()
    .setTitle('Tasks')
    .setDescription('Tasks Api Docs')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth()
    .addBasicAuth()
    .build();
  