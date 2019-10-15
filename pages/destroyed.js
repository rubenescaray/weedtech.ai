import React from 'react'
import Layout from '../components/layout'
import Heading from '../components/heading'

function Destroyed(props) {
  return(
    <Layout>
    <Heading heading="Destroyed Products" />
      <h2 className="heading-2">Destroyed</h2>
      <style jsx>{``}</style>
    </Layout>
  )
}

export default Destroyed