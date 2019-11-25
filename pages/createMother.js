import React, { useState } from 'react'
import { connect } from 'react-redux'
import ReactLoading from "react-loading";
import Layout from '../components/layout'
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, numberOptions, selectTheme } from '../config'
import { shootMessage } from '../redux/actions/messageActions';
import FormMessage from '../components/formMessage'

function CreateMother({ auth, dispatch }) {
  const [motherName, setMotherName] = useState('');
  const [motherOrigin, setMotherOrigin] = useState('');
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(1)

  const createNewMother = () => {
    let repeat = number

    if (motherName == '' || motherOrigin == '') {
      return shootMessage(dispatch, 'Please, fill all required fields', 'fail', 4000)
    }

    setLoading(true)

    addMother(repeat)
  }

  const addMother = (repeat) => {
    httpClient.get(`createNewMother/${auth.token}/${motherOrigin}/${motherName}`)
      .then(res => {
        let newNumber = repeat - 1;
        
        if (repeat < 2) {
          setMotherName('')
          setMotherOrigin('')
          setLoading(false)
          return shootMessage(dispatch, 'Mother added succesfully!', 'success', 4000)
        }
        
        addMother(newNumber)
      }).catch(error => {
        console.log(error)
        shootMessage(dispatch, 'There was an error, try again', 'fail', 4000)
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
                  onChange={data => setNumber(data.value)}
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
                <ReactLoading type={'spin'} color={'#fff'} height={25} width={25}/>
              </div>}
            </div>
          </form>
          <FormMessage />
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