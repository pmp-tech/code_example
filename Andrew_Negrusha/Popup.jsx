import React, { useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button, Popup } from '@shared/ui/base';
import { capitalizeString } from "@shared/lib";
import { residentialComplexesModel } from '@entities/residential-complexes';
import { createResidentialComplexModel } from '../../model/createResidentialComplex.model';
import { createComplexFormData } from '../../lib/createComplexFormData';
import { ImageInputs } from './ImageInputs/ImageInputs';
import { Fields } from './Fields/Fields';
import { PopupFileInputs } from './PopupFileInputs/PopupFileInputs';
import styles from './popup.module.scss';

export const CreateResidentialComplexPopup = observer(() => {

  const [otherImages, setOtherImages] = useState([]);
  const layoutImageInputRef = useRef(null);
  const complexImageInputRef = useRef(null);
  const otherImagesInputRef = useRef(null);
  const regulationRef = useRef(null);
  const documentRef = useRef(null);
  const standardRef = useRef(null);
  const contractRef = useRef(null);
  const conditionsRef = useRef(null);
  const popupRef = useRef(null);

  const { isEditMode } = createResidentialComplexModel

  const handleCreateButtonClick = async () => {
    const filesForFormData = {
      complexImage: complexImageInputRef.current.files[0],
      layoutImage: layoutImageInputRef.current.files[0],
      regulation: regulationRef.current.files[0],
      document: documentRef.current.files[0],
      standard: standardRef.current.files[0],
      contract: contractRef.current.files[0],
      conditions: conditionsRef.current.files[0],
    };

    const formData = createComplexFormData(createResidentialComplexModel.data);
    Object.entries(filesForFormData).forEach(([key, value]) => {
      return value && formData.append(`file[${isEditMode ? `new${capitalizeString(key)}` : key}]`, value)
    })
    otherImages.forEach((file) => file.isBlob && formData.append(`file[${isEditMode ? 'newOtherImages' : 'otherImages'}]`, file));

    let response = isEditMode
      ? await residentialComplexesModel.updateComplex(createResidentialComplexModel.editableComplexId, formData)
      : await residentialComplexesModel.createComplex(formData)

    if (response?.status === 200) {
      createResidentialComplexModel.setOpened(false)
      createResidentialComplexModel.setInitialData()
    } else {
      popupRef.current.scrollTo({ behavior: 'smooth', top: 0 })
    }
  };

  return (
    <Popup
      ref={popupRef}
      isOpened={createResidentialComplexModel.isOpened}
      onClose={() => createResidentialComplexModel.setOpened(false)}
      className={styles.popup}
    >
      <Fields/>
      <ImageInputs
        complexImageInputRef={complexImageInputRef}
        layoutImageInputRef={layoutImageInputRef}
        otherImagesInputRef={otherImagesInputRef}
        otherImages={otherImages}
        setOtherImages={setOtherImages}
      />
      <PopupFileInputs
        regulationRef={regulationRef}
        documentRef={documentRef}
        standardRef={standardRef}
        contractRef={contractRef}
        conditionsRef={conditionsRef}
      />
      <Button onClick={handleCreateButtonClick} className={styles.createButton}>
        {isEditMode ? 'Сохранить' : 'Создать'}
      </Button>
    </Popup>
  );
})
