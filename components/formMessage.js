import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const FormMessage = ({ style, message, show }) => {

  const backgroundColor = (style) => {
    let bgColor = ''

    switch (style) {
      case 'default':
        bgColor = '#dddddd'
        break
      case 'success':
        bgColor = '#d6e9c6'
        break
      case 'fail':
        bgColor = '#ffdede'
        break
    }

    console.log(bgColor);
    return bgColor
  }

  return (
    <div style={{display: show ? 'block' : 'none', backgroundColor: backgroundColor(style)}} className="form-message">
      <div>{message}</div>
      <style jsx>{`
      `}</style>
    </div>
  )
}

const mapState = state => {
  const { style, show, message } = state.message
  
  return {
    style,
    show,
    message,
  }
}

export default connect(mapState)(FormMessage)