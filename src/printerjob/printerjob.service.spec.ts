import { Test, TestingModule } from '@nestjs/testing';
import { PrinterjobService } from './printerjob.service';

describe('PrinterjobService', () => {
  let service: PrinterjobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrinterjobService],
    }).compile();

    service = module.get<PrinterjobService>(PrinterjobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
