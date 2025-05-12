import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

console.log(`AssessmentService:`, AssessmentService);
console.log(`AssessmentService.getFilteredList:`, AssessmentService.getFilteredList);

export const AssessmentList = () => {
  const [ filters, setFilters ] = useState({
    catDob: ``,
    catName: ``,
    instrumentType: ``,
    riskLevel: ``,
  });
  const [ assessments, setAssessments ] = useState([]);

  const fetchAssessments = async () => {
    try {
      // Filter out empty values before sending to the backend
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([ _, value ]) => value.trim() !== ``)
      );

      const data = await AssessmentService.getFilteredList(activeFilters); // Fetch filtered data
      console.log(`Backend response in frontend:`, data); // Log the response from the backend
      setAssessments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(`Error fetching assessments:`, error.message);
      setAssessments([]);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, [ filters ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

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

  console.log(`Assessments state:`, assessments); // Log the assessments state

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
      <div className="filter-bar" style={{ marginBottom: `20px`, maxWidth: `1500px`, width: `100%` }}>
        <input
          type="text"
          name="catName"
          placeholder="Cat Name"
          value={filters.catName}
          onChange={handleFilterChange}
          style={{ marginRight: `10px`, padding: `5px`, width: `200px` }}
        />
        <input
          type="date"
          name="catDob"
          placeholder="Date of Birth"
          value={filters.catDob}
          onChange={handleFilterChange}
          style={{ marginRight: `10px`, padding: `5px`, width: `200px` }}
        />
        <input
          type="text"
          name="instrumentType"
          placeholder="Instrument Type"
          value={filters.instrumentType}
          onChange={handleFilterChange}
          style={{ marginRight: `10px`, padding: `5px`, width: `200px` }}
        />
        <input
          type="text"
          name="riskLevel"
          placeholder="Risk Level"
          value={filters.riskLevel}
          onChange={handleFilterChange}
          style={{ marginRight: `10px`, padding: `5px`, width: `200px` }}
        />
        <button
          onClick={fetchAssessments}
          style={{ padding: `5px 10px` }}
        >
          Apply Filters
        </button>
      </div>
      <table
        {...getTableProps()}
        className="table table-bordered table-striped"
        style={{ maxWidth: `1500px`, textAlign: `center`, width: `100%` }}
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
