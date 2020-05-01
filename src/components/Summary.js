import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { capitalize } from '../helper'

const SummaryWrapper = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`

const Table = styled.table`
  width: 60%;
  max-width: 300px;
  margin: auto;
  text-align: right;

  td:nth-of-type(even) {
    text-align: left;
    padding-left: 10px;
  }
`

const Summary = ({ data }) => {
  if (Object.values(data).includes('')) return null

  const { brand, plan, year } = data

  return (
    <SummaryWrapper>
      <h2>Resumen de cotización</h2>
      <Table>
        <tbody>
          <tr>
            <td>Marca:</td>
            <td>{capitalize(brand)}</td>
          </tr>
          <tr>
            <td>Plan:</td>
            <td>{capitalize(plan)}</td>
          </tr>
          <tr>
            <td>Año:</td>
            <td>{year}</td>
          </tr>
        </tbody>
      </Table>
    </SummaryWrapper>
  )
}

Summary.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Summary
