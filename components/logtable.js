import React from 'react'
import { useTable } from 'react-table'
import styled from 'styled-components'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export default function LogTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Request Start Time',
        accessor: 'time',
      },
      {
        Header: 'Remote Address',
        accessor: 'remote_addr',
      },
      {
        Header: 'HTTP Verb',
        accessor: 'http_verb',
      },
      {
        Header: 'Status Code',
        accessor: 'status_code',
      },
      {
        Header: 'Request URL',
        accessor: 'url',
      },
      {
        Header: 'Request Size',
        accessor: 'request_length',
      },
      {
        Header: 'Response Size',
        accessor: 'body_bytes_sent',
      },
      {
        Header: 'Request Duration',
        accessor: 'request_time',
      },
    ],
    []
  )

  const { data, error } = useSWR(props.url, fetcher)


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
