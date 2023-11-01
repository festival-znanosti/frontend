import { get } from 'lodash'
import React from 'react'

const PERO = () => {
  function handleClick(e: any) {
    e.preventDefault()
    get(e, 'target.href', '')

    console.log('The link was clicked.')
  }

  return <div>PERO </div>
}

export default PERO
