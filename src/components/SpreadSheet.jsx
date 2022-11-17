import { useState } from 'react'
import { useSpreadSheet } from '../hooks/useSpreadSheet'

const FIRST_CHAR_CODE = 65

const range = (length) => Array.from({ length }, (_, i) => i)
const getColumn = (i) => String.fromCharCode(FIRST_CHAR_CODE + i)

export function SpreadSheet ({ rows, columns }) {
  const { cells, updateCell } = useSpreadSheet({ rows, columns })

  return (
    <table className='[&_td]:w-16'>
      <thead>
        <tr>
          <th />
          {range(columns).map((i) => (
            <th className='bg-slate-300' key={i}>
              {getColumn(i)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {range(rows).map((row) => {
          return (
            <tr key={row}>
              <td className='bg-slate-300' key={`first-${row}`}>
                {row}
              </td>
              {range(columns).map((column) => {
                return (
                  <td key={column}>
                    <Cell
                      x={column}
                      y={row}
                      cell={cells[column][row]}
                      update={(newValue) =>
                        updateCell({ x: column, y: row, value: newValue })}
                    />
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const Cell = ({ x, y, cell, update }) => {
  const [isInput, setIsInput] = useState(false)
  if (isInput) {
    return (
      <input
        autoFocus
        className='w-full'
        defaultValue={cell.value}
        onBlur={(event) => {
          setIsInput(false)
          update(event.target.value)
        }}
      />
    )
  }

  return (
    <span className='w-full block' onClick={() => setIsInput(true)}>
      {cell.computedValue}
    </span>
  )
}
