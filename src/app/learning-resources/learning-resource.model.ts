export class LearningResource {
  id: number;
  title: string;
  resourceTypeId: number;
  url: string;
  description: string;
  dateCreated: string;
  isInEditMode: boolean = false;
  iconClass: string;

  constructor() {
    this.resourceTypeId = 1;
  }
}


