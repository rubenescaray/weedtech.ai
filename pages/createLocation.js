import React, { useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import ReactLoading from "react-loading";
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, numberOptions, selectTheme } from '../config'
import { shootMessage } from '../redux/actions/messageActions'
import FormMessage from '../components/formMessage'

function CreateLocation({ auth, dispatch }) {
  const [number, setNumber] = useState(1);
  const [locationName, setLocationName] = useState('');
  const [locationOrigin, setLocationOrigin] = useState('');
  const [loading, setLoading] = useState(false);

  const createNewLocation = (e) => {
    e.preventDefault()
    let repeat = number

    if (locationName == '') {
      return shootMessage(dispatch, 'Please, fill all required fields', 'fail', 4000)
    }

    setLoading(true)
    addLocation(repeat)
  }

  const addLocation = (repeat) => {
    httpClient.get(`createNewLocation/${auth.token}/${locationName}/`)
      .then(res => {
        let newNumber = repeat - 1;
        if (repeat < 2) {
          setLocationName('')
          setLoading(false)
          return shootMessage(dispatch, 'Location added succesfully!', 'success', 4000)
        }

        addLocation(newNumber)
      }).catch(error => {
        console.log(error)
        shootMessage(dispatch, 'There was an error, try again', 'fail', 4000)
        setLoading(false)
      })
  }

  return (
    <Layout title="New Location">
      <Heading heading="Create New Location"/>
      <div className="createLocations">
        <h2 className="heading-2">Generate New Location</h2>
        <div className="form-box">
          <div className="w-form">
            <form method="post" id="email-form" name="email-form" data-name="Email Form">
              <div style={{marginBottom: '10px'}} className="field-col w-row">
                <div className="column-2 w-col w-col-4 w-col-small-small-stack">
                  <label for="name" className="field-label">Quantity of Locations:</label>
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
                  <label for="name-2" className="field-label">Location Name:</label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    value={locationName}
                    onChange={(event) => setLocationName(event.target.value)}
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256"
                    required 
                  />
                </div>
              </div>
              {/*<div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-3" className="field-label">Location Origin</label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    value={locationOrigin}
                    onChange={(event) => setLocationOrigin(event.target.value)}
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256"
                    required 
                  />
                </div>
              </div>*/}
              <div
                onClick={createNewLocation}
                className="submit-button w-button">
                {!loading ? <div>Create New Location</div> : <div>
                  <ReactLoading type={'spin'} color={'#fff'} height={25} width={25}/>
                </div>}
              </div>
            </form>
            <FormMessage />
          </div>
        </div>
      </div>
      <style jsx>{`
      .createLocations {

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

export default connect(mapState)(CreateLocation);