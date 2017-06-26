import { LearningResource } from '../learning-resources/learning-resource.model';

class AppController {
  resourceList: LearningResource[] = [];
  newResource: LearningResource = new LearningResource();
  isInAddMode: boolean = false;
  resourceTypes: any[];
  editingResource: LearningResource;

  constructor(public $window: any) {
    let existingResourceList = $window.localStorage.getItem('resourceList');
    this.resourceList =  existingResourceList ? JSON.parse(existingResourceList) : [];
    this.getResourceTypes();
  }

  createResource () {
    this.newResource.id = (this.resourceList.length === 0) ? 0 : this.resourceList[(this.resourceList.length - 1)].id + 1;
    let d = new Date();
    this.newResource.dateCreated = d.toLocaleString();
    this.newResource.iconClass = this.getTypeIconClass(this.newResource.resourceTypeId);
    this.resourceList.push(this.newResource);
    this.newResource = new LearningResource();
    this.$window.localStorage.setItem('resourceList', JSON.stringify(this.resourceList));
    this.isInAddMode = false;
  }

  deleteResource(id: number) {
    let deletedResourceIndex = this.getResourceIndexById(id);
    this.resourceList.splice(deletedResourceIndex, 1);
    this.$window.localStorage.setItem('resourceList', JSON.stringify(this.resourceList));
  }

  getResourceIndexById(id: number) {
    // This function will get the index into our local storage array based on the resource's "id" property
    return this.resourceList.findIndex(function(re){
      return re.id == id;
    });
  }

  getResourceTypes() {
    // TODO:  Add Mock Webservice
    this.resourceTypes = [
      {
        'id': 1,
        'name': 'Website'
      },
      {
        'id': 2,
        'name': 'Book'
      },
      {
        'id': 3,
        'name': 'Podcast'
      },
      {
        'id': 4,
        'name': 'Mobile App'
      },
      {
        'id': 5,
        'name': 'Other'
      }
    ];
  }

  getTypeIconClass (id: number) {
    let iconClass = 'fa fa-';
    switch(id){
      case 1:
        iconClass += 'globe';
        break;
      case 2:
        iconClass += 'book';
        break;
      case 3:
        iconClass += 'podcast';
        break;
      case 4:
        iconClass += 'mobile';
        break;
      case 5:
        iconClass += 'asterisk';
        break;
      default:
        iconClass = '';
        break;
    }
    return iconClass;
  }

  toggleEditMode (id: number, isEditMode: boolean) {
    let editingResourceIndex = this.getResourceIndexById(id);
    this.resourceList[editingResourceIndex].isInEditMode = isEditMode;
    this.$window.localStorage.setItem('resourceList', JSON.stringify(this.resourceList));

    if(isEditMode) {
      this.editingResource = this.resourceList[editingResourceIndex];
    }
    else {
      this.editingResource = null;
    }
  }

  updateResource (id: number) {
    let editingResourceIndex = this.getResourceIndexById(id);
    this.editingResource.isInEditMode = false;
    this.resourceList[editingResourceIndex] = this.editingResource;
    this.$window.localStorage.setItem('resourceList', JSON.stringify(this.resourceList));
  }
}

export const App: angular.IComponentOptions = {
  template: require('./App.html'),
  controller: AppController
};

