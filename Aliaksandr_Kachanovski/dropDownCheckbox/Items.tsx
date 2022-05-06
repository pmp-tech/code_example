import React from "react";
import { Grid } from "@material-ui/core/";
import { dropDownCheckboxStyles } from "./styles/DropDownCheckBox.styles";
import Checkbox from "./Checkbox";

export interface IProps {
  items: IReportFilter[];
  changeSelectedItems: (record: IReportFilter) => void;
  checkedRowsCount: string;
  withCount?: boolean;
  labelText?: string;
  showChildren?: boolean;
}

const Items = ({
  items,
  changeSelectedItems,
  withCount,
  checkedRowsCount,
  labelText,
  showChildren,
}: IProps) => {
  const classes = dropDownCheckboxStyles();

  return (
    <Grid container className={classes.rows}>
      {withCount && (
        <Grid
          className={classes.rowsHeader}
          justify={"space-between"}
          container
        >
          <Grid item>{labelText}</Grid>
          <Grid item>{checkedRowsCount}</Grid>
        </Grid>
      )}
      <Grid
        container
        className={classes.rowContainer}
        data-testid="row-container"
      >
        {items.map((item) => (
          <React.Fragment key={item.fieldName}>
            <Checkbox
              key={item.fieldName}
              item={item}
              onChange={changeSelectedItems}
              parentName={item.fieldName}
              isParent
            />
            {showChildren &&
              item.children?.map((child) => (
                <div className={classes.childRow} key={child.fieldName}>
                  <Checkbox
                    item={child}
                    onChange={changeSelectedItems}
                    isParent={false}
                    parentName={item.fieldName}
                  />
                </div>
              ))}
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

export default Items;
