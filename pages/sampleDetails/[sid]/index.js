import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import Heading from '../../../components/heading'
import httpClient  from '../../../config'

function SampleDetails({ auth }) {
  const [loading, setLoading] = useState(true)
  const [sampleInfo, setSampleInfo] = useState({})

  const router = useRouter();
  const { sid } = router.query;

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');

    const fetchData = async () => {
      await httpClient.get(`mySamples/${user_token}`)
        .then(res => {
          const response = res.data.success.filter(sample => {
            return sample.sampleID === sid;
          })
          console.log(response[0])
          setSampleInfo(response[0])
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 1000)
  }, []);

  if (loading) {
    return (
      <Layout title="Sample Details" >
        <Heading whereTo="/samples" heading={'My Samples > Sample Details'} />
        <h2 className="heading-2">Sample Details</h2>
        <p align="center">Loading...</p>
      </Layout>
    )
  }

  return(
    <Layout title="Sample Details">
      <Heading whereTo="/samples" heading="My Samples > Sample Details" />
      <h2 className="heading-2">Sample Details</h2>
      <div className="panel-group">

        <div className="panel panel-default">
          <div className="panel-heading">Sample Name</div>
          <div className="panel-body">{sampleInfo.productName}</div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">Sample ID</div>
          <div className="panel-body">{`${sid.slice(0,4)}-${sid.slice(4,8)}-${sid.slice(8,13)}`}</div>
        </div>

        <div className="panel panel-primary">
          <div className="panel-heading">Sample Stage </div>
          <div className="panel-body">{sampleInfo.productState}</div>
        </div>

        <div className="panel panel-success">
          <div className="panel-heading">Sample Notes</div>
          <div className="panel-body">
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <th>Notes</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">Time Created</div>
          <div className="panel-body">{new Date(sampleInfo.timestamp).toLocaleDateString("en-US")}</div>
        </div>
      </div>
      <input
        style={{
          float: 'left',
          marginTop: '0px',
          width: '15%'
        }}
        type="submit" 
        value="Edit" 
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

export default connect(mapState)(SampleDetails);