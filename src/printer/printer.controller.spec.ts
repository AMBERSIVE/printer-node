import { Test, TestingModule } from '@nestjs/testing';
import { PrinterController } from './printer.controller';

describe('Printer Controller', () => {
  let controller: PrinterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrinterController],
    }).compile();

    controller = module.get<PrinterController>(PrinterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
