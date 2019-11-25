import React, { useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import ReactLoading from "react-loading"
import Select from 'react-select'
import Heading from '../components/heading'
import httpClient, { selectStyles, numberOptions, selectTheme } from '../config'
import { shootMessage } from '../redux/actions/messageActions';
import FormMessage from '../components/formMessage'

function CreateProductId({ dispatch, auth }) {
  const [productName, setProductName] = useState('');
  const [productOrigin, setProductOrigin] = useState('');
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(1);

  const getProductID = (e) => {
    e.preventDefault()
    let repeat = number

    if (productName == '' || productOrigin == '') {
      return shootMessage(dispatch, 'Please, fill the required fields', 'fail', 4000)
    }

    setLoading(true)
    createProduct(repeat)
  }

  const createProduct = (repeat) => {
    httpClient.get(`createNewProduct/${auth.token}/${productName}/${productOrigin}`)
    .then(res => {
      let newNumber = repeat - 1

      if (repeat < 2) {
        setLoading(false)
        setProductName('')
        setProductOrigin('')
        return shootMessage(dispatch, 'All new products created succesfully!', 'success', 4000)
      }

      createProduct(newNumber)
    }).catch(error => {
      console.log(error)
      return shootMessage(dispatch, 'There was an error, try again', 'fail', 4000)
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
              <div className="column-2 w-col w-col-4 w-col-small-small-stack">
                <label for="name" className="field-label">Quantity of Products:</label>
              </div>
              <div style={{width: '55.5%', marginLeft: '-4px', paddingLeft: '0px'}} 
                className="w-col w-col-8 w-col-small-small-stack">
                <Select
                  onChange={(data) => setNumber(data.value)}
                  options={numberOptions} 
                  styles={selectStyles} 
                  theme={selectTheme}
                />
              </div>
            </div>
            <br/>
            <div className="field-col w-row">
              <div className="column-2 w-col w-col-4">
                <label for="name-2" className="field-label">Product Name:</label>
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
                <label for="name-3" className="field-label">Product Origin: </label>
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
              onClick={getProductID}
              type="submit"
              className="submit-button w-button">
              {!loading ? <div>Get New Ids</div> : <div>
                <ReactLoading type={'spin'} color={'#fff'} height={25} width={25}/>
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

export default connect(mapState)(CreateProductId);