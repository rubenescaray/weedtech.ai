import React, { useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, numberOptions, selectTheme } from '../config'

function CreateSamples({ auth }) {
  const [sampleName, setSampleName] = useState('');
  const [sampleOrigin, setSampleOrigin] = useState('');
  const [done, setDone] = useState(false);
  const [fail, setFail] = useState(false);
  const [empty, setEmpty] = useState(false);

  const createNewSample = async () => {
    setFail(false)
    setDone(false)
    setEmpty(false)

    if (sampleName == '' || sampleOrigin == '') {
      return setEmpty(true)
    }

    await httpClient.get(`createNewSample/${auth.token}/${sampleName}/${sampleOrigin}`)
      .then(res => {
        console.log(res)
        setDone(true)
        setSampleName('')
        setSampleOrigin('')
      }).catch(error => {
        console.log(error)
        setFail(true)
      })
  }

  return (
    <Layout title="New Sample">
      <Heading heading="Create New Sample" />
      <div className="createSample">
        <h2 className="heading-2">Generate New Sample</h2>
        <div className="form-box">
          <div className="w-form">
            <form action="/addSamplePost" method="post" id="email-form" name="email-form" data-name="Email Form">
              <div style={{marginBottom: '10px'}} className="field-col w-row">
                <div className="column-2 w-col w-col-4 w-col-small-small-stack">
                  <label for="name" className="field-label">Quantity of Samples:</label>
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
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-2" className="field-label">Sample Name:</label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    value={sampleName}
                    onChange={(event) => setSampleName(event.target.value)}
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256" 
                    required
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-3" className="field-label">Sample Origin</label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    value={sampleOrigin}
                    onChange={(event) => setSampleOrigin(event.target.value)}
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
                    createNewSample()
                  }}
                type="submit" 
                value="Create New Sample" 
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
            <div style={{display: empty ? 'block' : 'none'}} className="w-form-fail">
              <div>Please, fill the required fields!</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .createSample {

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

export default connect(mapState)(CreateSamples);