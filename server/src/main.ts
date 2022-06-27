import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 4000;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.enableCors();
    await app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}...`),
    );
  } catch (e) {
    process.exit(1);
  }
};

start();
