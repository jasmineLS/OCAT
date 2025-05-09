import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  const fetchAssessments = async () => {
    try {
      const data = await AssessmentService.getList();
      console.log(`Fetched assessments for table:`, data);
      setAssessments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(`Error fetching assessments:`, error.message);
      setAssessments([]);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const columns = useMemo(() => [
    { Header: `ID`, accessor: `id` },
    { Header: `Cat Name`, accessor: `catName` },
    { Header: `Date of Birth`, accessor: `catDob` },
    { Header: `Instrument Type`, accessor: `instrumentType` },
    { Header: `Score`, accessor: `score` },
    { Header: `Risk Level`, accessor: `riskLevel` },
    { Header: `Created At`, accessor: `createdAt` },
    { Header: `Updated At`, accessor: `updatedAt` },
    { Header: `Deleted At`, accessor: `deletedAt` },
  ], []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns,
    data: assessments,
    getRowId: (row, relativeIndex) => row.id ?? `row-${relativeIndex}`,
  });

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
          {headerGroups.map((headerGroup) =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                <th
                  {...column.getHeaderProps()}
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
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) =>
                    <td
                      {...cell.getCellProps()}
                      style={{ padding: `10px` }}
                    >
                      {cell.render(`Cell`)}
                    </td>)}
                </tr>
              );
            }) :
            <tr>
              <td colSpan={columns.length} className="text-center" style={{ padding: `20px` }}>
                No assessments found.
              </td>
            </tr>}
        </tbody>
      </table>
    </div>
  );
};
