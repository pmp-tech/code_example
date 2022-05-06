import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { inputSearchModel } from './input-search.model';


const typeTitles = [
    { type: 'builder', title: 'Застройщик' },
    { type: 'residentialComplex', title: 'ЖК' },
    { type: 'district', title: 'Район' },
];


export const InputSearch = observer(( {onChange, placeholder} ) => {

    const [inputValue, setInputValue] = useState('');
    const dropdown = useRef(null);


    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const handleClickOutside = (event) => {
        if (dropdown.current && !dropdown.current.contains(event.target)) {
            inputSearchModel.setDropdownList([]);
        }
    };

    const getTitleByType = (searchByType) => {
        return typeTitles.find(({ type }) => type === searchByType).title;
    };

    const handlerSelection = (type, text) => {
        setInputValue('');
        inputSearchModel.setDropdownList([]);
        onChange(type, text);
    };

    const handlerInput = (event) => {
        const {value} = event.target;
        setInputValue(value);
        inputSearchModel.getDropdownList(value);
    };

    return (
        <div className={styles.searchInput} ref={dropdown}>
            <input
                className={styles.input}
                placeholder={placeholder}
                value={inputValue}
                onChange={handlerInput}
            />

            {inputSearchModel.dropdownList.length
                ? <ul className={styles.hintList}>
                    {inputSearchModel.dropdownList?.map(( {text, type, id} ) => {
                        return (
                            <li key={id}
                                onClick={() => handlerSelection(type, text)}
                            >
                                <span className={styles.type}>{getTitleByType(type)}:</span> {text}
                            </li>
                        );
                    })}
                </ul>
                : null
            }
        </div>
    );
});
