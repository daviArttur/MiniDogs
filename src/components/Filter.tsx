import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import slice, { filterColorsFromUseSelector } from '../redux/reducers/products'
import { RootState, AppDispatch } from '../redux/store/store'


const Filter = () => {
  const state = useSelector((state: RootState) => state)
  const colors = useSelector(filterColorsFromUseSelector)
  const dispatch: AppDispatch = useDispatch()
  const [ minPrice, setMinPrice ] = React.useState<number>(0)
  const [ maxPrice, setMaxPrice ] = React.useState<number>(0)
  const [ selectedColors, setSelectedColors ] = React.useState<String[]>([])
  

  const { min, max } = state.data.filters.prices

  React.useEffect(() => {
    console.log(state)
  }, [])

  React.useEffect(() => {
    dispatch(slice.actions.changeColorsFilter({name: 'colors', value: selectedColors}))
  }, [selectedColors, dispatch])

  React.useEffect(() => {
    dispatch(slice.actions.changePricesFilter({name: 'colors', value: {
      min: Number(minPrice),
      max: Number(maxPrice)
    }}))
  }, [minPrice, maxPrice, dispatch])

  function handleChange({target}: ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      return setSelectedColors([...selectedColors, target.value])
    } else {
      return setSelectedColors(selectedColors.filter((color) => color !== target.value))
    }
  }

  function handleChecked(color: string) {
    return selectedColors.includes(color)
  }


  const setMax = min >= max - 2.5 ? Math.floor(max -  2.5) : undefined
  
  const setMin = max <= min + 2.5 && min !== 0 ? Math.ceil(min + 2.5) : undefined

  return (
    <div>
      <input type="number" value={minPrice} max={setMax}
        onChange={({target}) => {setMinPrice(Number(target.value))}}
        />
      <input type="number" value={maxPrice} min={setMin}
        onChange={({target}) => {setMaxPrice(Number(target.value))}}
        />

      {colors.map((color, index) => (
        <label key={index} style={{display: 'block'}}>
          <input 
            type="checkbox" 
            value={color} 
            onChange={handleChange} 
            checked={handleChecked(color)}/>
          {color}
        </label>
      ))}
    </div>
  )
}

export default Filter