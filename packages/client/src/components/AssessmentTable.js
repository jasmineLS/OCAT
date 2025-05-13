import React, { useEffect, useState } from 'react';
import { AssessmentService } from '../services/AssessmentService';

const AssessmentTable = () => {
  const [ assessments, setAssessments ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);

  const fetchAssessments = async (page = 1, append = false) => {
    const limit = 15;
    const offset = (page - 1) * limit;
    try {
      const { currentPage: serverPage, rows, totalPages: serverTotalPages } = await
      AssessmentService.getFilteredList({ limit, offset });
      setAssessments((prev) => append ? [ ...prev, ...rows ] : rows); // Append rows if navigating to the next page
      setCurrentPage(serverPage);
      setTotalPages(serverTotalPages);
    } catch (error) {
      console.error(`Error fetching assessments:`, error.message);
    }
  };

  useEffect(() => {
    fetchAssessments(currentPage);
  }, [ currentPage ]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      fetchAssessments(page, true); // Append data for the next page
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Cat Name</th>
            <th>Cat DOB</th>
            <th>Instrument Type</th>
            <th>Risk Level</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Deleted At</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment, index) =>
            <tr key={index}>
              <td>{assessment.catName}</td>
              <td>{assessment.catDob}</td>
              <td>{assessment.instrumentType}</td>
              <td>{assessment.riskLevel}</td>
              <td>{assessment.createdAt}</td>
              <td>{assessment.updatedAt}</td>
              <td>{assessment.deletedAt}</td>
            </tr>)}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AssessmentTable;
