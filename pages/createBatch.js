import React, { useState } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import Heading from '../components/heading'
import httpClient, { selectTheme, selectStyles, numberOptions } from '../config'

function CreateBatch(props) {
  const [batchName, setBatchName] = useState('')
  const [batchOrigin, setBatchOrigin] = useState('')
  const [done, setDone] = useState(false);
  const [fail, setFail] = useState(false);

  const createNewBatch = async () => {
    setFail(false)
    setDone(false)
    event.preventDefault()
    await httpClient.get(`createBatch/${auth.token}/${batchName}/${batchOrigin}`)
      .then(res => {
        console.log(res)
        setDone(true)
        setBatchName('')
        setBatchOrigin('')
      }).catch(error => {
        console.log(error)
        setFail(true)
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
              <input
                onClick={(event) => {
                    event.preventDefault()
                    createNewBatch()
                  }}
                type="submit" 
                value="Create New Batches" 
                data-wait="Please wait..." 
                className="submit-button w-button"
              />
            </form>
            <div style={{display: done ? 'block' : 'none'}} className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div style={{display: fail ? 'block' : 'none'}} className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
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