import React, { useState } from 'react'
import { connect } from 'react-redux'
import ReactLoading from "react-loading";
import Layout from '../components/layout'
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, numberOptions, selectTheme } from '../config'
import { shootMessage } from '../redux/actions/messageActions';
import FormMessage from '../components/formMessage'

function CreateSamples({ auth, dispatch }) {
  const [sampleName, setSampleName] = useState('');
  const [sampleOrigin, setSampleOrigin] = useState('');
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(1);

  const createNewSample = () => {
    let repeat = number

    if (sampleName == '' || sampleOrigin == '') {
      return shootMessage(dispatch, 'Please, fill all required fields', 'fail', 4000)
    }

    setLoading(true)

    addSample(repeat)
  }

  const addSample = (repeat) => {
    httpClient.get(`createNewSample/${auth.token}/${sampleName}/${sampleOrigin}`)
      .then(res => {
        let newNumber = repeat - 1;
        
        if (repeat < 2) {
          setSampleName('')
          setSampleOrigin('')
          setLoading(false)
          return shootMessage(dispatch, 'Sample added succesfully!', 'success', 4000)
        }

        addSample(newNumber)
      }).catch(error => {
        console.log(error)
        shootMessage(dispatch, 'There was an error, try again', 'fail', 4000)
        setLoading(false)
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
                    onChange={data => setNumber(data.value)}
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
              <div
                onClick={(event) => {
                    event.preventDefault()
                    createNewSample()
                  }}
                className="submit-button w-button"
              >
                {!loading ? <div>Create New Sample</div> : <div>
                  <ReactLoading type={'spin'} color={'#fff'} height={25} width={25}/>
                </div>}
              </div>
            </form>
            <FormMessage />
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