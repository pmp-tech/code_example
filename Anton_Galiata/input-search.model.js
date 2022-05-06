import { makeAutoObservable } from 'mobx';
import { ApiResidentialComplexSearchService } from '@/shared/api';

class InputSearchModel {
  dropdownList = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDropdownList(List) {
    this.dropdownList = List;
  }

  async getDropdownList(name) {
    const response = await ApiResidentialComplexSearchService.searchByName(name);
    this.setDropdownList(response.data);
  }

}

export const inputSearchModel = new InputSearchModel();
