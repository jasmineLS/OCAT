import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await AssessmentService.getList();
        setAssessments(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error(`Error fetching assessments:`, error);
        setAssessments([]);
      }
    };
    fetchAssessments();
  }, []);

  const columns = useMemo(() => [
    { Header: `ID`, accessor: `id` },
    { Header: `Cat Name`, accessor: `cat_name` },
    { Header: `Date of Birth`, accessor: `cat_date_of_birth` },
    { Header: `Instrument Type`, accessor: `instrument_type` },
    { Header: `Score`, accessor: `score` },
    { Header: `Risk Level`, accessor: `risk_level` },
    { Header: `Created At`, accessor: `created_at` },
    { Header: `Updated At`, accessor: `updated_at` },
    { Header: `Deleted At`, accessor: `deleted_at` },
  ], []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments });

  return (
    <div
      className="container mt-4"
      style={{
        alignItems: `center`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
      }}
    >
      <h2 style={{ marginBottom: `20px` }}>Assessment List</h2>
      <table
        {...getTableProps()}
        className="table table-bordered table-striped"
        style={{ maxWidth: `1200px`, textAlign: `center`, width: `100%` }}
      >
        <thead>
          {headerGroups.map((headerGroup, i) =>
            <tr {...headerGroup.getHeaderGroupProps()} key={`header-${i}`}>
              {headerGroup.headers.map((column, j) =>
                <th
                  {...column.getHeaderProps()}
                  key={`col-${j}`}
                  style={{
                    padding: `10px`,
                    textAlign: `center`,
                    verticalAlign: `middle`,
                  }}
                >
                  {column.render(`Header`)}
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ?
            rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.original?.id || `row-${i}`}>
                  {row.cells.map((cell) =>
                    <td
                      {...cell.getCellProps()}
                      key={`${row.original?.id || i}-${cell.column.id}`}
                      style={{ padding: `10px` }}
                    >
                      {cell.render(`Cell`)}
                    </td>)}
                </tr>
              );
            }) :
            <tr>
              <td
                colSpan={columns.length}
                className="text-center"
                style={{ padding: `20px` }}
              >
                No assessments found.
              </td>
            </tr>}
        </tbody>
      </table>
    </div>
  );
};
