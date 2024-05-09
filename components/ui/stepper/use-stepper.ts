import * as React from 'react'

import { StepperContext } from './context'

export const useStepper = () => {
  const context = React.useContext(StepperContext)
  return context
}
