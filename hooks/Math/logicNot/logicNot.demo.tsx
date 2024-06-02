import React, { useState } from 'react'
import { logicNot } from './logicNot'

const LogicNotDemo = () => {
  const [value, setValue] = useState(true)
  const [getterValue, setGetterValue] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked)
  }

  const handleGetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGetterValue(event.target.checked)
  }

  const notValue = logicNot(value)
  const notGetterValue = logicNot(() => getterValue)

  return (
    <div>
      <h1>Logic Not Demo</h1>
      <label>
        Input:
        <input type="checkbox" checked={value} onChange={handleChange} />
      </label>
      <p>NOT: {notValue.toString()}</p>
      <label>
        Getter Input:
        <input
          type="checkbox"
          checked={getterValue}
          onChange={handleGetterChange}
        />
      </label>
      <p>NOT Getter: {notGetterValue.toString()}</p>
    </div>
  )
}

export default LogicNotDemo
