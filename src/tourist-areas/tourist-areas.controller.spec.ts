import { Test, TestingModule } from '@nestjs/testing';
import { TouristAreasController } from './tourist-areas.controller';
import { TouristAreasService } from './tourist-areas.service';

describe('TouristAreasController', () => {
  let controller: TouristAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristAreasController],
      providers: [TouristAreasService],
    }).compile();

    controller = module.get<TouristAreasController>(TouristAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
