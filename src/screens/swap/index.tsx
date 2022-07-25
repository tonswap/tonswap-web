import React from 'react'
import { useTokens } from 'store/tokens/hooks'

function Swap() {
    const tokens = useTokens()
    console.log(tokens);
    
  return (
    <div>Swap</div>
  )
}

export  {Swap}