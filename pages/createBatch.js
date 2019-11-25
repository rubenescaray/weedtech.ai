import React, { useState } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import ReactLoading from "react-loading"
import Layout from '../components/layout'
import Heading from '../components/heading'
import httpClient, { selectTheme, selectStyles, numberOptions } from '../config'
import { shootMessage } from '../redux/actions/messageActions'
import FormMessage from '../components/formMessage'

function CreateBatch({ auth, dispatch }) {
  const [batchName, setBatchName] = useState('')
  const [batchOrigin, setBatchOrigin] = useState('')
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(1);

  const createNewBatch = () => {
    let repeat = number

    if (batchName == '' || batchOrigin == '') {
      return shootMessage(dispatch, 'Please, fill all required fields', 'fail', 4000)
    }

    setLoading(true)
    addBatch(repeat)
  }

  const addBatch = repeat => {
    httpClient.get(`createBatch/${auth.token}/${batchName}/${batchOrigin}`)
      .then(res => {
        let newNumber = repeat - 1;
        console.log(res)
        if (repeat < 2) {
          setBatchName('')
          setBatchOrigin('')
          setLoading(false)
          return shootMessage(dispatch, 'Location added succesfully!', 'success', 4000)
        }
        
        addBatch(newNumber)
      }).catch(error => {
        console.log(error)
        shootMessage(dispatch, 'There was an error, try again', 'fail', 4000)
        setLoading(false)
      })
  }

  return(
    <Layout title="New Batch">
      <Heading heading="Create New Batch" />
      <div className="createBatch">
        <h2 className="heading-2">Generate New Batch</h2>
        <div className="form-box">
          <div className="w-form">
            <form action="/addSamplePost" method="post" id="email-form" name="email-form" data-name="Email Form">
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4 w-col-small-small-stack">
                  <label for="name" className="field-label">Number of Batches:</label>
                </div>
                <div style={{width: '55.5%', marginBottom: '20px', marginLeft: '-4px', paddingLeft: '0px'}} 
                  className="w-col w-col-8 w-col-small-small-stack">
                  <Select
                    onChange={data => setNumber(data.value)}
                    options={numberOptions} 
                    styles={selectStyles} 
                    theme={selectTheme}
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-2" className="field-label">Name:</label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    value={batchName}
                    onChange={(event) => setBatchName(event.target.value)}
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256" required
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-3" className="field-label">Batch Origin</label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    value={batchOrigin}
                    onChange={(event) => setBatchOrigin(event.target.value)}
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
                    createNewBatch()
                  }}
                className="submit-button w-button"
              >
                {!loading ? <div>Create New Batches</div> : <div>
                  <ReactLoading type={'spin'} color={'#fff'} height={25} width={25}/>
                </div>}
              </div>
            </form>
            <FormMessage />
          </div>
        </div>
      </div>
      <style jsx>{`
      .createBatch {

      }
      `}</style>
    </Layout>
  )
}

const mapState = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapState)(CreateBatch);