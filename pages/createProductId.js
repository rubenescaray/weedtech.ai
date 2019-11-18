import React, { useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import ReactLoading from "react-loading";
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, numberOptions, selectTheme } from '../config'

function CreateProductId({ auth }) {
  const [productName, setProductName] = useState('');
  const [productOrigin, setProductOrigin] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [fail, setFail] = useState(false);
  const [empty, setEmpty] = useState(false);

  const getProductID = async () => {
    setFail(false)
    setDone(false)
    setEmpty(false)

    if (productName == '' || productOrigin == '') {
      return setEmpty(true)
    }

    setLoading(true)

    await httpClient.get(`createNewProduct/${auth.token}/${productName}/${productOrigin}`)
      .then(res => {
        setDone(true)
        setProductName('')
        setProductOrigin('')
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setFail(true)
        setLoading(false)
      })
  }

  return (
    <Layout title={'New Product ID'}>
      <Heading heading="Create New Product IDs" />
      <h2 className="heading-2">Generate New Product IDs</h2>
      <div className="form-box">
        <div className="w-form">
          <form  method="post" id="email-form" name="email-form" data-name="Email Form">
            <div className="field-col w-row">
              <div style={{justifyContent: 'flex-start'}} className="column-2 w-col w-col-4 w-col-small-small-stack">
                <label for="name" className="field-label">Quantity of Products:</label>
              </div>
              <div style={{width: '55.5%', marginLeft: '-4px', paddingLeft: '0px'}} 
                className="w-col w-col-8 w-col-small-small-stack">
                <Select
                  options={numberOptions} 
                  styles={selectStyles} 
                  theme={selectTheme}
                />
              </div>
            </div>
            <br/>
            <div className="field-col w-row">
              <div className="column-2 w-col w-col-4">
                <label for="name-2" className="field-label">Product Name (Strain if plant):</label>
              </div>
              <div className="w-col w-col-8">
                <input
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  type="text"
                  className="text-field w-input" 
                  maxlength="256"
                  required 
                />
              </div>
            </div>
            <br/>
            <div className="field-col w-row">
              <div className="column-2 w-col w-col-4">
                <label for="name-3" className="field-label">Product Origin (Seedling, Mother ID, Product ID, etc): </label>
              </div>
              <div className="w-col w-col-8">
                <input
                  value={productOrigin}
                  onChange={(event) => setProductOrigin(event.target.value)}
                  type="text" 
                  className="text-field w-input" 
                  maxlength="256"
                  required 
                />
              </div>
            </div>
            <div 
              onClick={(event) => {
                    event.preventDefault()
                    getProductID()
                  }}
              type="submit"
              className="submit-button w-button">
              {!loading ? <div>Get New Ids</div> : <div>
                <ReactLoading type={'spin'} color={'#fff'} height={45} width={45}/>
              </div>}
            </div>
          </form>
          <div style={{display: done ? 'block' : 'none'}} className="w-form-done">
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div style={{display: fail ? 'block' : 'none'}} className="w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
          <div style={{display: empty ? 'block' : 'none'}} className="w-form-fail">
            <div>Please, fill the required fields!</div>
          </div>
        </div>
      </div>
      <style jsx>{`

      `}</style>
    </Layout>
  )
}

const mapState = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapState)(CreateProductId);