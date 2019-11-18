import React, { useState } from 'react'
import { connect } from 'react-redux'
import ReactLoading from "react-loading";
import Layout from '../components/layout'
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, numberOptions, selectTheme } from '../config'

function CreateMother({ auth }) {
  const [motherName, setMotherName] = useState('');
  const [motherOrigin, setMotherOrigin] = useState('');
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false);
  const [fail, setFail] = useState(false);
  const [empty, setEmpty] = useState(false);

  const createNewMother = async () => {
    setFail(false)
    setDone(false)
    setEmpty(false)

    if (motherName == '' || motherOrigin == '') {
      return setEmpty(true)
    }

    setLoading(true)

    await httpClient.get(`createNewMother/${auth.token}/${motherOrigin}/${motherName}`)
      .then(res => {
        console.log(res)
        setDone(true)
        setMotherName('')
        setMotherOrigin('')
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setFail(true)
        setLoading(false)
      })
  }

  return (
    <Layout title={'New Mother IDs'}>
      <Heading heading="Create New Mother" />
      <h2 className="heading-2">Generate New Mother</h2>
      <div className="form-box">
        <div className="w-form">
          <form method="post" id="email-form" name="email-form" data-name="Email Form">
            <div style={{marginBottom: '10px'}} className="field-col w-row">
              <div className="column-2 w-col w-col-4 w-col-small-small-stack">
                <label for="name" className="field-label">Quantity of Mothers:</label>
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
                <label for="name-2" className="field-label">Mother Name:</label>
              </div>
              <div className="w-col w-col-8">
                <input
                  value={motherName}
                  onChange={(event) => setMotherName(event.target.value)}
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
                <label for="name-3" className="field-label">Mother Origin: </label>
              </div>
              <div className="w-col w-col-8">
                <input
                  value={motherOrigin}
                  onChange={(event) => setMotherOrigin(event.target.value)}
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
                    createNewMother()
                  }}
              className="submit-button w-button">
              {!loading ? <div>Create Mother IDs</div> : <div>
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
      .createMother {

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

export default connect(mapState)(CreateMother);