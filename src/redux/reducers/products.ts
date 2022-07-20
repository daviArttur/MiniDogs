import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data";
import { RootState } from '../store/store'

type changeColorsFilterType = {
  type: string,
  payload: {
    name: 'colors',
    value: String[]
  }
}

type changePricesFilterType = {
  type: string,
  payload: {
    name: 'colors',
    value: {
      min: number,
      max: number,
    }
  }
}

type initialStateType = {
  data: typeof data
  filters: {
    colors: String[],
    prices: {
      min: number,
      max: number
    }
  }
}

const initialState: initialStateType = {
  data,
  filters: {
    colors: [],
    prices: {
      min: 0,
      max: 0
    }
  }
}

const slice = createSlice({
  name: 'productsSlice',
  initialState: {
    ...initialState
  },
  reducers: {
    changeColorsFilter(state, action: changeColorsFilterType) {
      state.filters.colors = action.payload.value
    },
    changePricesFilter(state, action: changePricesFilterType) {
      state.filters.prices = action.payload.value
    },
  }
});

export const filterColorsFromUseSelector = ({data}: RootState) =>  {
  const colors = Array.from(new Set(
    data.data.map(({color}) => {
      return color
    })
  ))
  return colors
}

export default slice