import React, { useState } from 'react'
import styled from '@emotion/styled'

import Header from './components/Header'
import Formulario from './components/Formulario'
import Result from './components/Result'
import Summary from './components/Summary'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`
function App() {
  const [summary, setSummary] = useState({
    cotizacion: 0,
    data: {
      brand: '',
      year: '',
      plan: 'basico',
    },
  })

  const { cotizacion, data } = summary

  const [loading, setLoading] = useState(false)

  return (
    <Contenedor>
      <Header title="Cotizador de Seguros" />
      <ContenedorFormulario>
        <Formulario setSummary={setSummary} setLoading={setLoading} />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Summary data={data} />
            <Result cotizacion={cotizacion} />
          </>
        )}
      </ContenedorFormulario>
    </Contenedor>
  )
}

export default App
