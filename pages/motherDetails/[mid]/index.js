import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import Heading from '../../../components/heading'
import httpClient  from '../../../config'

function MotherDetails({ auth }) {
  const [loading, setLoading] = useState(true)
  const [motherInfo, setMotherInfo] = useState({})
  const [eventsLength, setEventsLength] = useState(0)

  const router = useRouter()
  const { mid } = router.query;

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    
    const fetchData = async () => {
      await httpClient.get(`myMothers/${user_token}`)
        .then(res => {
          let response = res.data.success.filter(mother => mother.productID === mid)
          const events = formatEvents(response[0].events)
          const responseWithEvents = Object.assign({}, response[0], {
            events: events,
          })

          console.log(responseWithEvents)
          setEventsLength(events.length)
          setMotherInfo(responseWithEvents)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 500)
  }, []);

  const formatEvents = (events) => {
    const formattedEvents = [];

    events.map((event) => {
      if (!(Array.isArray(event))) {
        formattedEvents.push(event)
      }

      formattedEvents.push(event[0])
    })

    return formattedEvents.filter(el => el != null)
  }

  const noteColumns = [{
    Header: 'Note',
    id: 'note',
    accessor: index => index,
    Cell: props => <p>{props.value}</p>,
  },{
    Header: 'Product ID',
    Cell: props => <p className="table-link">Delete Note</p>,
  }]

  const eventColumns = [{
    Header: 'Type',
    accessor: 'type',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Time',
    accessor: 'time',
    Cell: props => <p>{new Date(props.value).toGMTString()}</p>,
  }, {
    Header: 'Event',
    accessor: 'value',
    Cell: props => <p>{props.value}</p>,
  }]

  if (loading) {
    return (
      <Layout title="Mother Details" >
        <Heading whereTo="/mothers" heading={'My Mothers > Mother Details'} />
        <h2 className="heading-2">Mother Details</h2>
        <p align="center">Loading...</p>
      </Layout>
    )
  }

  return(
    <Layout>
      <Heading whereTo="/mothers" heading="My Mothers > Mother Details" />
      <h2 className="heading-2">Mother Details</h2>
      <div className="panel-group">

        <div className="panel panel-default">
          <div className="panel-heading">Plant Name</div>
          <div className="panel-body">{motherInfo.productName}</div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">Plant ID</div>
          <div className="panel-body">{`${mid.slice(0,4)}-${mid.slice(4,8)}-${mid.slice(8,13)}`}</div>
        </div>

        <div className="panel panel-primary">
          <div className="panel-heading">Product Stage </div>
          <div className="panel-body">{motherInfo.productState}</div>
        </div>

        <div className="panel panel-default">
            <div className="panel-heading">Product Location</div>
            <div className="panel-body">Not Set</div>
        </div>

        <div className="panel panel-success">
          <div className="panel-heading">Product Notes</div>
          <div className="panel-body">
            {motherInfo.productNotes.length < 1 
                ? 
                <p>No Notes added</p>
                :
                <ReactTable
                  data={motherInfo.productNotes}
                  columns={noteColumns}
                  minRows={0}
                  showPagination={false}
                />
            }
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">Time Created</div>
          <div className="panel-body">{new Date(motherInfo.timestamp).toLocaleDateString("en-US")}</div>
        </div>

        <div className="panel panel-info">
		      <div className="panel-heading">Event Log</div>
		      <div className="panel-body">
            <br/><br/>
            <center>
              <h3>{eventsLength} Events Found</h3>
              <br/><br/>
              <ReactTable
                data={motherInfo.events}
                columns={eventColumns}
                minRows={0}
                showPagination={false}
              />
            </center>
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

export default connect(mapState)(MotherDetails);