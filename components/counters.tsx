import { useState } from 'react'

export default function MyApp() {
  const [count, setCount] = useState(0)

  return (
    <button className="button counter" onClick={() => setCount((value) => value + 1)}>
      Clicked {count} times
    </button>
  )
}
