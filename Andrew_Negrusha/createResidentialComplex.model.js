import { makeAutoObservable } from 'mobx';
import { dateNow } from "@shared/lib";
import { editableResidentialComplexDataAdapter } from "./../lib/editableResidentialComplexDataAdapter";

const initialData = {
  address: { value: '', type: 'string' },
  agreement: { value: '', type: 'string' },
  complexImage: { value: '', type: 'string' },
  contract: { value: '', type: 'string' },
  conditions: { value: '', type: 'string' },
  curatorId: { value: '', type: 'number' },
  deadline: { value: '', type: 'string' },
  descriptionComplete: { value: '', type: 'string' },
  descriptionIsShort: { value: '', type: 'string' },
  developer: { value: '', type: 'string' },
  document: { value: '', type: 'string' },
  distanceToMetro: { value: '', type: 'string' },
  elevator: { value: '', type: 'string' },
  escrow: { value: '', type: 'string' },
  facade: { value: '', type: 'string' },
  finishing: { value: [], type: 'string', isJson: true },
  houseType: { value: '', type: 'string' },
  layoutImage: { value: '', type: 'string'},
  metroName: { value: '', type: 'string' },
  name: { value: '', type: 'string' },
  otherImages: { value: [], type: 'string', isJson: true },
  parking: { value: [], type: 'string', isJson: true },
  payment: { value: [], type: 'string', isJson: true },
  regulation: { value: '', type: 'string' },
  sameType: { value: '', type: 'string' },
  standard: { value: '', type: 'string'},
  startOfSales: { value: dateNow, type: 'string', isDate: true },
};

class CreateResidentialComplexModel {
  isOpened = false
  isEditMode = false
  editableComplexId = null
  data = {...initialData}

  constructor() {
    makeAutoObservable(this);
  }

  setEditableResidentialComplexData(residentialComplex) {
    const residentialComplexFields = Object.keys(residentialComplex)

    residentialComplexFields.forEach(key => {
      if (this.data.hasOwnProperty(key)) {
        const adaptedValue = editableResidentialComplexDataAdapter(key, residentialComplex[key])
        this.setValueByKey(key, adaptedValue)
      }
    })

    this.isEditMode = true
    this.editableComplexId = residentialComplex.id
  }

  setOpened(isOpened) {
    this.isOpened = isOpened

    const closedWithEditMode = !this.isOpened && this.isEditMode
    if (closedWithEditMode) {
      this.setInitialData()
    }
  }


  setValueByKey(key, value) {
    this.data[key].value = value;
  }

  setInitialData() {
    this.data = {...initialData}
    this.isEditMode = false
    this.editableComplexId = null
  }
}

export const createResidentialComplexModel = new CreateResidentialComplexModel();
