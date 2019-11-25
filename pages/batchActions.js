import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import Layout from '../components/layout'
import ReactLoading from "react-loading"
import Link from 'next/link'
import Heading from '../components/heading';
import httpClient, { selectStyles, selectTheme } from '../config'

function batchActions({ auth }) {
  const [showSelect, setShowSelect] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [options, setOptions] = useState({})
  const [batchID, setBatchId] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState(false)
  const [batchName, setBatchName] = useState('')
  const [batchState, setBatchState] = useState('')
  const [batchNote, setBatchNote] = useState('')

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');

    const fetchData = async () => {
      await httpClient.get(`findBatchesDetails/${user_token}`)
        .then(res => {
          console.log(res.data)
          setOptions(formatBatches(res.data))
          setShowSelect(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 2000)
  }, []);

  const formatBatches = (data) => {
    let batches = []

    data.map((batch) => {
      batches.push({
        value: batch.batchID,
        label: batch.batchName,
      })
    })

    return batches;
  }
 

  const onChangeSelect = (data) => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const batchId = data.value

    setLoading(true)
    setBatchId(batchId)
    setSelectedBatch(true)

    httpClient.get(`viewBatch/${user_token}/${data.value}`)
      .then(res => {
        const events = formatEvents(res.data[0].events)
        const _location = findLocation(events)
        const _batchState = findBatchState(events)
        
        console.log(_batchState)
        setBatchState(_batchState)
        setBatchName(res.data[0].batchName)
        loadLocations(user_token, _location)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }

  const formatLocations = (data) => {
    let locations = [];

    data.map((location) => {
      locations.push({
        value: location.locationID,
        label: location.locationName,
      })
    })

    return locations
  }

  const formatEvents = (events) => {
    const formattedEvents = [];

    events.map((event) => {

      if (!(Array.isArray(event))) {
        formattedEvents.push(event)
      }

      formattedEvents.push(event[0])
    })

    return formattedEvents.filter(el => el != undefined)
  }

  const findLocation = (events) => {
    let lastLocation = ''
    let biggerLocation = 0

    events.map((event, i) => {
      const { value } = event

      if (event.value == null) {
        return
      }

      if (value.includes('Location')) {
        if (i > biggerLocation) {
          lastLocation = value
        }
      }
    })

    return lastLocation.slice(20)
  }

  const findBatchState = (events) => {
    let lastState = ''
    let biggerState = 0

    events.map((event, i) => {
      const { value } = event

      if (event.value == null) {
        return
      }

      if (value.includes('State')) {
        if (i > biggerState) {
          lastState = value
        }
      }
    })

    return lastState.slice(16)
  }

  const onLocationSelect = (data) => {
    setSelectedLocation(data.value)
  }

  const loadLocations = (token, location) => {
    httpClient.get(`myLocations/${token}`)
      .then(res => {
        const _locations = res.data.success 
        setLocations(formatLocations(_locations))
        const _location = _locations.filter(l => l.locationID === location)
        

        if (_location.length < 1) {
          setLocation('No location')
        } else {
          const locationName = _location[0].locationName;
          setLocation(locationName)
        }

        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const changeBatchName = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    console.log(`batchChangeName/${user_token}/${batchID}/${batchName}`)
    httpClient.get(`changeBatchName/${user_token}/${batchID}/${batchName}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const changeBatchLocation = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');

    if (selectedLocation == '') {
      return alert('Please add a location')
    }

    console.log(`batchChangeLocation/${user_token}/${batchID}/${selectedLocation}`)
    httpClient.get(`batchChangeLocation/${user_token}/${batchID}/${selectedLocation}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const changeBatchState = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');

    if (batchState == '') {
      return alert('Please add a batch stage')
    }
    
    console.log(`batchChangeStage/${user_token}/${batchID}/${batchState}`)
    httpClient.get(`batchChangeStage/${user_token}/${batchID}/${batchState}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const batchAddNote = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');

    if (batchNote == '') {
      return alert('Please add a batch note')
    }
    
    console.log(`batchAddNote/${user_token}/${batchID}/${batchNote}`)
    httpClient.get(`batchAddNote/${user_token}/${batchID}/${batchNote}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const smallFont = {
    fontSize: '0.8rem'
  }

  return(
    <Layout title="Batch Actions">
      <Heading heading="Batch Actions" />
      <div className="batchActions">
        <h2 className="heading-2">Edit Batches</h2>
        {showSelect ? <div className="select-product">
            <Select 
              options={options} 
              styles={selectStyles} 
              theme={selectTheme}
              onChange={onChangeSelect}
            />
          </div> : <div className="loading-div">
            <ReactLoading type={'spin'} color={'#478978'} />
          </div>}
        {selectedBatch && <div>
          {loading ? <div className="loading-div">
            <ReactLoading type={'spin'} color={'#478978'} />
          </div> : <div>
          <div className="batchesOptions">
            <div className="panel panel-primary">
              <div className="panel-heading">Choose Locations</div>
              <div className="panel-body">
                {!locations && <ReactLoading type={'spin'} color={'#478978'} height={48} width={48} />}
                {locations && <p className="current-info">Current: {location}</p>}
                {locations && <Select 
                  options={locations} 
                  styles={selectStyles} 
                  theme={selectTheme}
                  onChange={onLocationSelect}
                />}
                {locations && <input
                  onClick={changeBatchLocation}
                  type="submit"
                  style={smallFont}
                  value="Change Location" 
                  data-wait="Please wait..." 
                  className="submit-button w-button"
                />}
              </div>
            </div>
          </div>
          <div className="batchesOptions">
            <div className="panel panel-primary">
              <div className="panel-heading">Change Name</div>
              <div className="panel-body">
                <input
                  value={batchName}
                  onChange={(event) => setBatchName(event.target.value)}
                  type="text"
                  className="text-field w-input fit-content" 
                  maxlength="256" 
                  required
                />
                <input
                  onClick={changeBatchName}
                  type="submit" 
                  value="Change Name"
                  style={smallFont}
                  className="submit-button w-button"
                />
              </div>
            </div>
          </div>
          <div className="batchesOptions">
            <div className="panel panel-primary">
              <div className="panel-heading">Change Stage</div>
              <div className="panel-body">
                <input
                  value={batchState}
                  onChange={(event) => setBatchState(event.target.value)}
                  type="text" 
                  className="text-field w-input fit-content" 
                  maxlength="256"
                />
                <input
                  onClick={changeBatchState}
                  type="submit" 
                  value="Change Stage" 
                  style={smallFont} 
                  className="submit-button w-button"
                />
              </div>
            </div>
          </div>
          <div className="batchesOptions">
            <div className="panel panel-default">
              <div className="panel-heading">Add Note</div>
              <div className="panel-body">
                <input
                  onChange={(event) => setBatchNote(event.target.value)}
                  type="text" 
                  className="text-field w-input fit-content" 
                  maxlength="256" 
                  required
                />
                <input
                  onClick={batchAddNote}
                  type="submit" 
                  value="Add Note" 
                  style={smallFont}
                  className="submit-button w-button"
                />
              </div>
            </div>
          </div>
          <div className="batchesOptions">
            <div className="panel panel-default">
              <div className="panel-heading">Destroy Batch</div>
              <div className="panel-body">
                <input
                  type="submit" 
                  value="Destroy Batch" 
                  style={smallFont} 
                  className="submit-button w-button"
                />
              </div>
            </div>
          </div>
          <div className="batchesOptions">
            <div className="panel panel-default">
              <div className="panel-heading">Transfer to New Owner</div>
              <div className="panel-body">
                <input
                  type="text" 
                  className="text-field w-input fit-content" 
                  maxlength="256" 
                  required
                />
                <input
                  type="submit" 
                  value="Transfer" 
                  style={smallFont}
                  className="submit-button w-button"
                />
              </div>
            </div>
            </div>
          </div>}
        </div>}
      </div>

      <style jsx>{`
      .batchActions {

      }
      .batchesOptions {
        margin-bottom: 15px;
      }
      .select-product {
        margin-bottom: 30px;
      }
      .panel-group {
        margin-bottom: 20px;
      }
      .panel {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
      }
      .panel-default {
        border-color: #ddd;
      }
      .panel-group .panel {
        margin-bottom: 10px;
        border-radius: 4px;
      }
      .panel-heading {
        padding: 10px 15px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      .panel-group .panel-heading {
        border-bottom: 0;
      }
      .panel-default>.panel-heading {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
      }
      .panel-body {
        padding: 15px;
      }
      .panel-primary {
        border-color: rgba(68, 132, 115, 0.5);
      }
      .panel-group .panel+.panel {
        margin-top: 5px;
      }
      .panel-primary>.panel-heading {
        color: #fff;
        background-color: rgba(68, 132, 115, 0.5);
        border-color: rgba(68, 132, 115, 0.5);
      }
      .submit-button {
        margin-right: 0;
        margin-left: 0;
        width: 170px;
        height: 30px;
        font-size: 0.8em;
        margin-top: 10px;
        text-align: center;
      }
      .current-info {
        margin: .5em auto;
        font-size: 1rem;
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

export default connect(mapState)(batchActions);