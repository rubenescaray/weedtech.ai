import React, { useState, useEffect } from 'react'
import ReactLoading from "react-loading"
import { connect } from 'react-redux'
import Link from 'next/link'
import QRCode from 'qrcode.react'
import Layout from '../components/layout'
import Heading from '../components/heading'
import DeleteModal from '../components/modals/deleteModal'
import ReactTable from 'react-table'
import httpClient from '../config'

function ViewLocations({ auth }) {
  const [locations, setLocations] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const fetchData = async () => {
      await httpClient.get(`myLocations/${user_token}`)
        .then(res => {
          console.log(res)
          setLocations(res.data.success)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 2000)
  }, []);

  const splitID = (string) => {
    if (string === undefined) {
      return
    }
    return <Link href="locationDetails/[lid]" as={`locationDetails/${string}`}>
      <p className="table-link">
        {`${string.slice(0,3)}-${string.slice(3,7)}-${string.slice(7,12)}`}
      </p>
    </Link>;
  }

  const createdTime = (createdAt) => {
    return new Date(createdAt).toLocaleDateString("en-US");
  }

  const deleteLocation = (locationId) => {
    setSelectedLocation(locationId)
    toggleModal()
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  const deleteCallback = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const newLocations = locations.filter(location => location.locationID != selectedLocation)

    setLocations(newLocations)
    httpClient.get(`deleteLocation/${user_token}/${selectedLocation}`)
      .then(res => {
        console.log(res)
        toggleModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const columns = [{
    Header: 'Scan Code',
    accessor: 'locationID',
    Cell: props => <QRCode value={props.value ? props.value : 'ABCDEFGHIJK'} size="50" />,
  },{
    Header: 'Location ID',
    accessor: 'locationID',
    Cell: props => splitID(props.value),
  }, {
    Header: 'Location Name',
    accessor: 'locationName',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Locaiton Notes',
    accessor: 'locationNotes',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Created',
    accessor: 'timestamp',
    Cell: props => <p>{createdTime(props.value)}</p>,
  }, {
    Header: 'Delete Location',
    accessor: 'locationID',
    Cell: props => 
      <button 
        onClick={() => deleteLocation(props.value)} 
        className="submit-button w-button inside-box-btn">
        Delete
      </button>,
  }]

  return (
    <Layout title="Locations">
      <DeleteModal show={modal} typeOf='location' cancel={toggleModal} accept={deleteCallback} />
      <Heading heading="View Locations" />
      <div className="viewLocations">
        <h2 className="heading-2">Available Locations</h2>
        {loading ? <div className="loading-div">
            <ReactLoading type={'spin'} color={'#478978'} />
          </div> : <ReactTable 
            data={locations}
            columns={columns}
            minRows={0}
            showPagination={false}
          />} 
      </div>
      <style jsx>{`
      .viewLocations {

      }
      `}</style>
    </Layout>
  );
}

const mapState = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapState)(ViewLocations);