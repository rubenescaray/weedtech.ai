import React, { useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import ReactLoading from "react-loading";
import Heading from '../components/heading';
import httpClient from '../config'
import { shootMessage } from '../redux/actions/messageActions';
import FormMessage from '../components/formMessage'

function AddProduct({ auth, dispatch }) {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productState, setProductState] = useState('');
  const [loading, setLoading] = useState(false);

  const manuallyAddProduct = async () => {

    if (productName == '' || productState == '' || productId == '') {
      return shootMessage(dispatch, 'Please, fill the required fields', 'fail', 4000)
    }

    setLoading(true)

    await httpClient.get(`reAddProduct/${auth.token}/${productId}/${productName}/${productState}`)
      .then(res => {
        shootMessage(dispatch, 'All new products created succesfully!', 'success', 4000)
        setProductName('')
        setProductState('')
        setLoading(false)
      }).catch(error => {
        console.log(error)
        shootMessage(dispatch, 'There was an error, try again', 'fail', 4000)
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
                <label for="name-3" className="field-label">Product Id: </label>
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
                <label for="name-3" className="field-label">Product State: </label>
              </div>
              <div className="w-col w-col-8">
                <input
                  value={productState}
                  onChange={(event) => setProductState(event.target.value)}
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
          <FormMessage />
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