import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import Heading from '../../../components/heading'
import httpClient  from '../../../config'

function LocationDetails(props) {
  const [loading, setLoading] = useState(true)
  const [locationInfo, setLocationInfo] = useState('')

  const { auth } = props
  const router = useRouter()
  const { lid } = router.query;

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');

    const fetchData = async () => {
      await httpClient.get(`checkLocation/${user_token}/${lid}`)
        .then(res => {
          console.log(res)
          setLocationInfo(res.data.locationName)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 2000)
  }, [])

  return(
    <Layout title="Location Details">
      <Heading whereTo="/locations" heading="My Locations > Location Details" />
      <h2 className="heading-2">Edit Location</h2>
      <div className="panel-group">
        <div className="panel panel-default">
          <div className="panel-heading">Location Name</div>
          <div className="panel-body">    
            <input 
              type="text" 
              id="locationName" 
              value={locationInfo} 
              required
              className="text-field w-input" 
            />
          </div>
        </div>
      </div>
      <input
        style={{
          float: 'left',
          marginTop: '0px',
          width: '15%'
        }}
        type="submit" 
        value="Submit" 
        data-wait="Please wait..." 
        className="submit-button w-button" 
      />
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

export default connect(mapState)(LocationDetails);