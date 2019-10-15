import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import QRCode from 'qrcode.react'
import Layout from '../components/layout';
import Heading from '../components/heading';
import ReactTable from 'react-table'
import httpClient from '../config'

function ViewLocations({ auth }) {
  const [locations, setLocations] = useState([{}])
  const [loading, setLoading] = useState(true)

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
    Header: 'Delete User',
    Cell: props => <a>Delete</a>,
  }]

  return (
    <Layout title="Locations">
      <Heading heading="View Locations" />
      <div className="viewLocations">
        <h2 className="heading-2">Available Locations</h2>
        {loading ? 
        <p align="center">Loading...</p> 
        : 
        <ReactTable 
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