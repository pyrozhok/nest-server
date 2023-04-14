import { NotFoundException } from '@nestjs/common';
class TagNotFoundException extends NotFoundException {
  constructor(tagId: number) {
    super(`Tag with id ${tagId} not found`);
  }
}

export default TagNotFoundException;
