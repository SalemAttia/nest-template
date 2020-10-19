import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module';
import * as config from 'config';
import {options as swaggerOptions } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';


const PORT = process.env.NODE_PORT

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfiguration = config.get('server');
  const port = PORT || serverConfiguration.port;

  const app = await NestFactory.create(AppModule);

  if(process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  logger.log(`Task Application listening on port ${PORT}`)
}
bootstrap();
