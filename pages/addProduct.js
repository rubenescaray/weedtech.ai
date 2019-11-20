import React, { useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import ReactLoading from "react-loading";
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, numberOptions, selectTheme } from '../config'

function AddProduct({ auth }) {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [fail, setFail] = useState(false);
  const [empty, setEmpty] = useState(false);

  const manuallyAddProduct = async () => {
    setFail(false)
    setDone(false)
    setEmpty(false)

    if (productName == '' || productId == '') {
      return setEmpty(true)
    }

    setLoading(true)

    await httpClient.get(`reAddProduct/${auth.token}/${productId}/${productName}/${productState}`)
      .then(res => {
        setDone(true)
        setProductName('')
        setProductId('')
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setFail(true)
        setLoading(false)
      })
  }

  return (
    <Layout title={'Add Product'}>
      <Heading heading="Manually Add Product" />
      <h2 className="heading-2">Add Product Id Manually</h2>
      <div className="form-box">
        <div className="w-form">
          <form  method="post">
            <div className="field-col w-row">
              <div className="column-2 w-col w-col-4">
                <label for="name-2" className="field-label">Name:</label>
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
            <div className="field-col w-row">
              <div className="column-2 w-col w-col-4">
                <label for="name-3" className="field-label">Product ID: </label>
              </div>
              <div className="w-col w-col-8">
                <input
                  value={productId}
                  onChange={(event) => setProductId(event.target.value)}
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
                    manuallyAddProduct()
                  }}
              type="submit"
              className="submit-button w-button">
              {!loading ? <div>Add Product</div> : <div>
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

export default connect(mapState)(AddProduct);