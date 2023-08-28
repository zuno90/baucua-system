import { Test, TestingModule } from '@nestjs/testing';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

describe('CmsController', () => {
  let cmsController: CmsController;

  beforeEach(async () => {
    const cms: TestingModule = await Test.createTestingModule({
      controllers: [CmsController],
      providers: [CmsService],
    }).compile();

    cmsController = cms.get<CmsController>(CmsController);
  });

  describe('root', () => {
    it('should return "Hello World CMS service!"', () => {
      expect(cmsController.getHello()).toBe('Hello World CMS service!');
    });
  });
});
