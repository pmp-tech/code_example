import React, { useEffect, useState, useRef } from "react";
import { TextFieldComponent } from "./TextFieldCompoent";
import Items from "./Items";
import { Grid } from "@material-ui/core/";
import { dropDownCheckboxStyles } from "./styles/DropDownCheckBox.styles";

export interface IProps {
  items: IReportFilter[];
  onChange: (columns: IReportFilter[]) => void;
  labelText: string;
  withCount?: boolean;
  closeOnBlur?: boolean;
  showChildren?: boolean;
}

const DropDownCheckbox = ({
  items,
  onChange,
  labelText,
  withCount = false,
  closeOnBlur = true,
  showChildren = false,
}: IProps) => {
  const classes = dropDownCheckboxStyles();
  const [checkedRowsCount, setCheckedRowsCount] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [itemsWithInputFilter, setItemsWithInputFilter] = useState<
    IReportFilter[]
  >([]);

  const node = useRef<HTMLDivElement | null>(null);

  useDropDown({ node, closeOnBlur, setIsOpenDropDown: setIsOpen });

  useEffect(() => {
    const clonedItems: IReportFilter[] = JSON.parse(JSON.stringify(items));
    const allChildren = clonedItems?.map((item) => item.children).flat();
    const matches = clonedItems?.filter((item) =>
      item.label?.toLowerCase()?.includes(textFieldValue.toLowerCase())
    );
    showChildren === true &&
      allChildren?.filter((child) => {
        // check if any of the children matches search
        if (
          child &&
          child.label.toLowerCase().includes(textFieldValue.toLowerCase())
        ) {
          const parent = clonedItems?.find(
            (item) => item.fieldName === child.fieldName.split(".")[0]
          ) as IReportFilter;
          const parentIndex = matches.findIndex(
            (item) => item.fieldName === parent.fieldName
          );
          // if the parent has no `children` property, or the parent has not been matched before
          // we set the `children` property to an empty array
          if (!parent.children || parentIndex === -1) {
            parent.children = [];
          }
          // if the child is not already in the filtered parent, add it. To avoid duplicates
          if (
            !ArrayUtils.isObjectInArray(parent.children, "fieldName", child)
          ) {
            parent.children.push(child);
          }
          // if the parent has not been matched before, add it, otherwise, update the position. To avoid duplicates
          if (parentIndex === -1) {
            matches.push(parent);
          } else {
            matches[parentIndex] = parent;
          }
        }
      });
    setItemsWithInputFilter(matches);
  }, [items, textFieldValue]);

  useEffect(() => {
    setTextFieldValue("");
  }, [isOpen]);

  useEffect(() => {
    if (withCount) {
      const count = items.filter(
        (column) => column.checked || column.indeterminate
      );
      setCheckedRowsCount(`${count.length} out of ${items.length} selected`);
    }
  }, [items, withCount]);

  const changeTextFieldHandler = (value: string) => {
    setTextFieldValue(value);
  };

  const changeSelectedItems = (record: IReportFilterExtended) => {
    const itemToUpdateIndex = items.findIndex(
      (item) => item.fieldName === record.parentName
    );
    if (itemToUpdateIndex === -1) {
      return;
    }
    // Split the array by the position of the record to be updated. We will merge after
    const itemsBefore: IReportFilter[] =
      itemToUpdateIndex === 0 ? [] : items.slice(0, itemToUpdateIndex);
    const itemToUpdate: IReportFilter = items[itemToUpdateIndex];
    const itemsAfter: IReportFilter[] = items.slice(itemToUpdateIndex + 1);
    // if a parent checkbox is clicked, we want to update all children checkboxes accordingly
    if (record.isParent) {
      const itemToUpdateCurrentStatus = itemToUpdate.checked;
      itemToUpdate.checked = !itemToUpdateCurrentStatus;
      itemToUpdate.indeterminate = false;
      if (showChildren === true) {
        itemToUpdate.children?.map(
          (child) => (child.checked = !itemToUpdateCurrentStatus)
        );
      }
      // This flag ensures that we don't traverse children for components that don't need to show children checkboxes
    } else if (showChildren === true) {
      const children = itemToUpdate.children ?? [];
      const childIndexNumber = children.findIndex(
        (child) => child.fieldName === record.fieldName
      );
      // If we find the child, we update the checked status
      if (children[childIndexNumber]) {
        children[childIndexNumber].checked =
          !children[childIndexNumber].checked;
      }
      // If all the children are checked, check the parent
      if (itemToUpdate.children?.every((child) => child.checked === true)) {
        itemToUpdate.checked = true;
        itemToUpdate.indeterminate = false;
        // If all the children are unchecked, uncheck the parent
      } else if (
        itemToUpdate.children?.every((child) => child.checked === false)
      ) {
        itemToUpdate.checked = false;
        itemToUpdate.indeterminate = false;
        // If some children are checked while some are not, set the parent to `indeterminate` state
      } else {
        itemToUpdate.checked = false;
        itemToUpdate.indeterminate = true;
      }
    }

    const joinedColumns: IReportFilter[] = [
      ...itemsBefore,
      itemToUpdate,
      ...itemsAfter,
    ];
    onChange(joinedColumns);
  };

  return (
    <Grid ref={node} container className={classes.main}>
      <TextFieldComponent
        textFieldValue={textFieldValue}
        changeTextFieldHandler={changeTextFieldHandler}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        labelText={labelText}
      />
      {isOpen && (
        <Items
          data-testid="dropdown-checkbox-items"
          withCount={withCount}
          labelText={labelText}
          checkedRowsCount={checkedRowsCount}
          items={itemsWithInputFilter}
          changeSelectedItems={changeSelectedItems}
          showChildren={showChildren}
        />
      )}
    </Grid>
  );
};

export default DropDownCheckbox;
