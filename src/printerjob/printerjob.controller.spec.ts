import { Test, TestingModule } from '@nestjs/testing';
import { PrinterjobController } from './printerjob.controller';

describe('Printerjob Controller', () => {
  let controller: PrinterjobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrinterjobController],
    }).compile();

    controller = module.get<PrinterjobController>(PrinterjobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
