import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Total = styled.div`
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #26c6da;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`

const Message = styled.p`
  background-color: rgb(127, 224, 237);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`
const Text = styled.p`
  color: #00838f;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`

const Result = ({ cotizacion }) => {
  return cotizacion ? (
    <Total>
      <TransitionGroup className="resultado">
        <CSSTransition classNames="resultado" key={cotizacion} timeout={{ enter: 500, exit: 500 }}>
          <Text>El total es: ${cotizacion.toFixed(2)}</Text>
        </CSSTransition>
      </TransitionGroup>
    </Total>
  ) : (
    <Message>Elige marca, año y tipo de seguro</Message>
  )
}

Result.propTypes = {
  cotizacion: PropTypes.number.isRequired,
}

export default Result
