import React from 'react'
import Link from 'next/link'

function Heading({ heading, whereTo }) {
  return (
    <div>
      <div>
        <div className="text left">Dashboard > {heading}</div>
        <Link href={whereTo ? whereTo : "/dashboard"}>
          <div className="text left">
            <a style={{cursor: 'pointer', fontSize: '16px'}}>Go back</a>
          </div>
        </Link>
      </div>
      <style jsx>{`
      .heading {

      }
      `}</style>
    </div>
  )
}

export default Heading