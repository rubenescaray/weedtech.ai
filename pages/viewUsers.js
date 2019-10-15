import React from 'react'
import ReactTable from 'react-table'
import Layout from '../components/layout'
import Heading from '../components/heading'

function ViewUsers() {
  const users = [
    {
      uid: 0,
      name: 'rubenescaray',
      scanCode: 16,
      notes: null,
      created: '09/05/2019',
    },
    {
      uid: 1,
      name: 'andresescaray',
      scanCode: 23,
      notes: null,
      created: '07/07/2019',
    },
    {
      uid: 2,
      name: 'valeriaescaray',
      scanCode: 160,
      notes: null,
      created: '10/25/2019',
    },
  ];

  const columns = [{
    Header: 'Scan Code',
    accessor: 'scanCode' // String-based value accessors!
  }, {
    Header: 'Username',
    accessor: 'name',
  }, {
    Header: 'Notes',
    accessor: 'notes'
  }, {
    Header: 'Created',
    accessor: 'created'
  }, {
    Header: 'Delete User',
    Cell: props => <a>Delete</a>,
  }]

  return (
    <Layout title="View Users">
      <Heading heading="View Users" />
      <div className="viewUsers">
        <h2 className="heading-2">Available Users</h2>
        <ReactTable 
          data={users} 
          columns={columns} 
          minRows={0}
          showPagination={false}
        />
      </div>
      <style jsx>{`
      .viewUsers {

      }
      `}</style>
    </Layout>
  )
}

export default ViewUsers