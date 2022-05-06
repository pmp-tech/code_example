import { AmountOperator, FilterOperator } from "./amountRange.types";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  createStyles,
  makeStyles,
  Box,
} from "@material-ui/core";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

export const amountOperators: AmountOperator[] = [
  {
    value: FilterOperator.GREATER_THAN,
    symbol: "\u003E",
  },
  {
    value: FilterOperator.GREATER_OR_EQUALS_THAN,
    symbol: `\u003E=`,
  },
  {
    value: FilterOperator.LESS_THAN,
    symbol: "\u003C",
  },
  {
    value: FilterOperator.LESS_OR_EQUALS_THAN,
    symbol: "\u003C=",
  },
  {
    value: FilterOperator.EQUALS,
    symbol: "=",
  },
  {
    value: FilterOperator.NOT_EQUALS,
    symbol: "!=",
  },
  {
    value: "range",
    symbol: "Range",
  },
];

const acceptedValues = (amount?: number) => {
  return `${amount}`.replace(/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, "$2");
};

export interface Props {
  amountFrom?: number;
  setAmountFrom: Dispatch<SetStateAction<number>>;
  amountTo?: number;
  setAmountTo: Dispatch<SetStateAction<number>>;
  operator: FilterOperator | "range";
  setOperator: Dispatch<SetStateAction<FilterOperator | "range">>;
  changeAmountValues: () => void;
  resetAmountFilters?: boolean;
  withApplyButton?: boolean;
}

const AmountRange = (props: Props) => {
  const {
    amountFrom,
    amountTo,
    setAmountFrom,
    setAmountTo,
    setOperator,
    operator,
    changeAmountValues,
    withApplyButton = true,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    if (!withApplyButton) {
      changeAmountValues();
    }
  }, [amountFrom, amountTo, operator]);

  const changeOperator = (
    event: ChangeEvent<{ value: FilterOperator | "range" }>
  ) => {
    setOperator(event.target.value);
  };

  const changeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      +event.target.value < 0
        ? Math.abs(+event.target.value)
        : +event.target.value;

    if (event.target.id === "amount-input") {
      setAmountFrom(value);
    } else {
      setAmountTo(value);
    }
  };

  const generateMenuItems = () =>
    amountOperators.map((amountOperator) => (
      <MenuItem
        value={amountOperator.value}
        key={amountOperator.value}
        data-testid={amountOperator.value}
      >
        <div>{amountOperator.symbol}</div>
      </MenuItem>
    ));

  const renderRange = () => (
    <Grid container spacing={0} className={classes.amountInputTo}>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <FormControl className={classes.formControl}>
          <TextField
            id="amount-input-to"
            label="Amount - To"
            data-testid="amount-input-to"
            className={classes.amountInput}
            value={acceptedValues(amountTo)}
            type="number"
            onChange={changeAmount}
            InputProps={{
              inputProps: { min: 0 },
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );

  return (
    <Box className={classes.container} id="amount-range">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="operators_label">Operators</InputLabel>
            <Select
              labelId="operators_label"
              id="operators"
              data-testid="operators"
              value={operator}
              onChange={changeOperator as any}
            >
              {generateMenuItems()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <FormControl className={classes.formControl}>
            <TextField
              id="amount-input"
              label={operator !== "range" ? "Amount" : "Amount - From"}
              data-testid="amount-input"
              className={classes.amountInput}
              value={acceptedValues(amountFrom)}
              type="number"
              onChange={changeAmount}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      {operator === "range" && renderRange()}
      {withApplyButton && (
        <Grid item style={{ textAlign: "right", margin: "20px 20px 0px 0px" }}>
          <button onClick={changeAmountValues}>Apply</button>
        </Grid>
      )}
    </Box>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: "1rem",
      backgroundColor: "white",
      borderRadius: "4px",
    },
    formControl: {
      width: "100%",
    },
    amountInput: {
      "& > label": {
        paddingLeft: "40px",
      },
      "& > div": {
        paddingLeft: "30px",
      },
    },
    amountInputTo: {
      marginTop: "25px",
    },
  })
);

export default AmountRange;
