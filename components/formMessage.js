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

    return bgColor
  }

  return (
    <div className={show ? 'message-visible' : 'message-hidden'} style={{backgroundColor: backgroundColor(style)}}>
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