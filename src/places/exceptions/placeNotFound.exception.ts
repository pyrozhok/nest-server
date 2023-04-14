import { NotFoundException } from '@nestjs/common';
class PlaceNotFoundException extends NotFoundException {
  constructor(placeId: number) {
    super(`Place with id ${placeId} not found`);
  }
}

export default PlaceNotFoundException;
