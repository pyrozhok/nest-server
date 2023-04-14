import { NotFoundException } from '@nestjs/common';
class TouristAreaNotFoundException extends NotFoundException {
  constructor(areaId: number) {
    super(` Tourist area with id ${areaId} not found`);
  }
}

export default TouristAreaNotFoundException;
