import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'

type data = {
  id: number;
  name: string;
  color: string;
  price: number;
}

const filterColors = (colors: any) => (product: any) => {
  return !colors.length || colors.includes(product.color)
}

const filterPrices = ({min, max}: any) => (product: any) => {
  if (!min && !max) {
    return true
  } else {
    return product.price >= min && product.price <=max
  }
}

const FilterProducts = (({data}: RootState) => {
  const colors = data.filters.colors
  const prices = data.filters.prices
  const filteredProducts = data.data.filter(filterColors(colors)).filter(filterPrices(prices))
  return filteredProducts
})

const Products = () => {

  const data  = useSelector(FilterProducts)

  return (
    <table>
      <thead style={{display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: "center"}}>
        <tr style={{display: "flex", justifyContent: 'space-between', alignItems: "center", width: '160px'}}>
          <th>nome</th>
          <th>cor</th>
          <th>preço</th>
        </tr>
      </thead>
      <tbody >
        {data && data.map(({id, color, name, price}) => {
          return (
            <tr key={id} style={{width: '100px'}}>
              <td>{name}</td>
              <td>{color}</td>
              <td>{price}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Products