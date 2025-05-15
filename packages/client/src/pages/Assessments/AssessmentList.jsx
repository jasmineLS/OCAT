import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { Button, Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap';
import AssessmentService from '../../services/AssessmentService'; // Ensure correct import

const AssessmentList = () => {
  const [ filters, setFilters ] = useState({
    catDob: ``,
    catName: ``,
    instrumentType: ``,
    riskLevel: ``,
  });
  const [ appliedFilters, setAppliedFilters ] = useState({});
  const [ assessments, setAssessments ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);

  const fetchAssessments = async (page = 1, currentFilters = {}) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
      const { count, rows } = await AssessmentService.getFilteredList({
        ...currentFilters,
        limit,
        offset,
      });
      setAssessments(rows); // Exclude soft-deleted records
      setTotalPages(Math.ceil(count / limit));
    } catch (error) {
      setAssessments([]);
    }
  };

  useEffect(() => {
    fetchAssessments(currentPage, appliedFilters);
  }, [ currentPage, appliedFilters ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      catDob: ``,
      catName: ``,
      instrumentType: ``,
      riskLevel: ``,
    });
    setAppliedFilters({});
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AssessmentService.delete(id); // Call the API to soft delete the assessment
      setAssessments((prevAssessments) => prevAssessments.filter((assessment) => assessment.id !== id)); // Remove the row from the UI
    } catch (error) {
      console.error(`Error deleting assessment:`, error);
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) { return ``; }
    const date = new Date(dateTime);
    return date.toLocaleString(); // Format to local date and time
  };

  const columns = useMemo(() => [
    { Header: `ID`, accessor: `id` },
    { Header: `Cat Name`, accessor: `catName` },
    { Header: `Date of Birth`, accessor: `catDob` },
    { Header: `Instrument Type`, accessor: `instrumentType` },
    { Header: `Score`, accessor: `score` },
    { Header: `Risk Level`, accessor: `riskLevel` },
    {
      Cell: ({ value }) => formatDateTime(value), // Format the date
      Header: `Created At`,
      accessor: `createdAt`,
    },
    {
      Cell: ({ value }) => formatDateTime(value), // Format the date
      Header: `Updated At`,
      accessor: `updatedAt`,
    },
    {
      Cell: ({ value }) => formatDateTime(value), // Format the date
      Header: `Deleted At`,
      accessor: `deletedAt`,
    },
    {
      Cell: ({ row }) =>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </Button>,
      Header: `Actions`,
      accessor: `actions`,
    },
  ], []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows: tableRows,
  } = useTable({
    columns,
    data: assessments,
    getRowId: (row, relativeIndex) => row.id ?? `row-${relativeIndex}`,
  });

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Assessment List</h2>
      <Row className="mb-4">
        <Col>
          <Form.Control
            type="text"
            name="catName"
            placeholder="Filter by Cat Name"
            value={filters.catName}
            onChange={handleFilterChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="date"
            name="catDob"
            placeholder="Filter by Date of Birth"
            value={filters.catDob}
            onChange={handleFilterChange}
          />
        </Col>
        <Col>
          <Form.Select
            name="instrumentType"
            value={filters.instrumentType}
            onChange={handleFilterChange}
          >
            <option value="">Filter by Instrument Type</option>
            <option value="Behavioral">Behavioral</option>
            <option value="Psychological">Psychological</option>
            <option value="Medical">Medical</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select
            name="riskLevel"
            value={filters.riskLevel}
            onChange={handleFilterChange}
          >
            <option value="">Filter by Risk Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Select>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleApplyFilters} className="me-2">
            Apply Filter
          </Button>
          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Col>
      </Row>
      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map((headerGroup) =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                <th {...column.getHeaderProps()}>{column.render(`Header`)}</th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {tableRows.length > 0 ?
            tableRows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) =>
                    <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
                </tr>
              );
            }) :
            <tr>
              <td colSpan={columns.length} className="text-center">
                No assessments found.
              </td>
            </tr>}
        </tbody>
      </Table>
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1}>
          Back
        </Pagination.Prev>
        <Pagination.Item active>{`Page ${currentPage} of ${totalPages}`}</Pagination.Item>
        <Pagination.Next onClick={handleNextPage} disabled={currentPage >= totalPages}>
          Next
        </Pagination.Next>
      </Pagination>
    </Container>
  );
};

export default AssessmentList;
