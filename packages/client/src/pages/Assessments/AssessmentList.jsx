import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ filters, setFilters ] = useState({
    catDob: ``,
    catName: ``,
    instrumentType: ``,
    riskLevel: ``,
  });
  const [ assessments, setAssessments ] = useState([]);

  const fetchAllAssessments = async () => {
    try {
      const data = await AssessmentService.getList(); // Fetch all results
      setAssessments(Array.isArray(data) ? data : []);
    } catch (error) {
      setAssessments([]); // Clear assessments on error
    }
  };

  // Fetch all assessments on page load
  useEffect(() => {
    fetchAllAssessments();
  }, []);

  const fetchAssessments = async (currentFilters) => {
    try {
      const data = await AssessmentService.getFilteredList(currentFilters);
      setAssessments(Array.isArray(data) ? data : []);
    } catch (error) {
      setAssessments([]); // Clear assessments on error
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    const hasFilters = Object.values(filters).some((value) => value.trim() !== ``);
    if (hasFilters) {
      fetchAssessments(filters); // Fetch filtered results
    } else {
      fetchAllAssessments(); // Fetch all results if no filters are applied
    }
  };

  const handleClearFilters = () => {
    setFilters({
      catDob: ``,
      catName: ``,
      instrumentType: ``,
      riskLevel: ``,
    });
    fetchAllAssessments(); // Fetch all results after clearing filters
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

  return (
    <div className="container mt-4" style={{
      alignItems: `center`,
      display: `flex`, flexDirection: `column`, justifyContent: `center`,
    }}>
      <h2 style={{ marginBottom: `20px` }}>Assessment List</h2>
      <div className="filter-bar" style={{ marginBottom: `20px`, maxWidth: `1500px`, width: `100%` }}>
        <input
          type="text"
          name="catName"
          placeholder="Filter by Cat Name"
          value={filters.catName}
          onChange={handleFilterChange}
          style={{ marginRight: `10px`, padding: `5px`, width: `200px` }}
        />
        <input
          type="date"
          name="catDob"
          placeholder="Filter by Date of Birth"
          value={filters.catDob}
          onChange={handleFilterChange}
          style={{ marginRight: `10px`, padding: `5px`, width: `200px` }}
        />
        <select
          name="instrumentType"
          value={filters.instrumentType}
          onChange={handleFilterChange}
          style={{ marginRight: `10px`, padding: `5px`, width: `200px` }}
        >
          <option value="">Filter by Instrument Type</option>
          <option value="Behavioral">Behavioral</option>
          <option value="Psychological">Psychological</option>
          <option value="Medical">Medical</option>
        </select>
        <select
          name="riskLevel"
          value={filters.riskLevel}
          onChange={handleFilterChange}
          style={{ marginRight: `10px`, padding: `5px`, width: `200px` }}
        >
          <option value="">Filter by Risk Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleApplyFilters} style={{ marginRight: `10px`, padding: `5px 10px` }}>
          Apply Filter
        </button>
        <button onClick={handleClearFilters} style={{ marginRight: `10px`, padding: `5px 10px` }}>
          Clear Filters
        </button>
      </div>
      <table {...getTableProps()} className="table table-bordered table-striped"
        style={{ maxWidth: `1500px`, textAlign: `center`, width: `100%` }}>
        <thead>
          {headerGroups.map((headerGroup) =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                <th {...column.getHeaderProps()}
                  style={{ padding: `10px`, textAlign: `center`, verticalAlign: `middle` }}>
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
                    <td {...cell.getCellProps()} style={{ padding: `10px` }}>
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
