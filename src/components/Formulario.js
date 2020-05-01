import React, { useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { getYearDiff, calculateBrand, getPlan } from '../helper'

const Field = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`

const Label = styled.label`
  flex: 0 0 100px;
`

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`

const InputRadio = styled.input`
  margin: 0 1rem;
`

const Button = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`

const Formulario = ({ setSummary, setLoading }) => {
  const [data, setData] = useState({
    brand: '',
    year: '',
    plan: 'basico',
  })

  const [error, setError] = useState(false)

  // Extraer los valores del state
  const { brand, year, plan } = data

  // Leer los datos del formulario y colocarlos en el state
  const getInfo = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if ([brand.trim(), year.trim(), plan.trim()].includes('')) {
      setError(true)
      return
    }
    setError(false)

    // Una base de 2000
    let base = 2000

    // obtener la diferencia de años
    const yearDiff = getYearDiff(year)

    // por cada año hay que restar el 3%
    const yearCalc = base - base * yearDiff * 0.03

    // Americano 15%
    // Asiático 5%
    // Europeo 30%
    let result = calculateBrand(brand) * yearCalc

    // Básico aumenta 20%
    // Completo 50%

    result = parseFloat((getPlan(plan) * result).toFixed(2))

    setLoading(true)

    setTimeout(() => {
      // Total
      setSummary({
        cotizacion: result,
        data,
      })
      setLoading(false)
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}

      <Field>
        <Label>Marca</Label>
        <Select name="brand" value={brand} onChange={getInfo}>
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiático</option>
        </Select>
      </Field>
      <Field>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={getInfo}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Field>

      <Field>
        <Label>Plan</Label>
        <InputRadio type="radio" name="plan" value="basico" checked={plan === 'basico'} onChange={getInfo} /> Básico
        <InputRadio type="radio" name="plan" value="completo" checked={plan === 'completo'} onChange={getInfo} />{' '}
        Completo
      </Field>

      <Button type="submit">Cotizar</Button>
    </form>
  )
}

Formulario.propTypes = {
  setSummary: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default Formulario
