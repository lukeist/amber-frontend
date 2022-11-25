const Record = ({ record, length }) => (
  <tr>
    <td className="td-year">{record.year}</td>
    <td className="td-course">{record.course}</td>
    <td>{record.instructor}</td>
    <td
      className={`col-last ${
        record.students < record.totalStudents / length ? "bold" : ""
      }`}
    >
      {record.students}
    </td>
    {/* // The commented code under is for editing the list after getting clarified*/}
    {/* <td>
    <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
      Edit
    </Link>{" "}
    |
    <button
      className="btn btn-link"
      onClick={() => {
        props.deleteRecord(props.record._id);
      }}
    >
      Delete
    </button>
  </td> */}
  </tr>
);

export default function RecordList({ instructors }) {
  function recordList(recordsInstructors) {
    return recordsInstructors.map((record, index, recordsInstructors) => (
      <Record key={index} record={record} length={recordsInstructors.length} />
    ));
  }

  return (
    <div id="recordList">
      <table className="table table-striped">
        <caption>
          <h2>{instructors[0].course}</h2>
        </caption>

        <thead>
          <tr id="tr-header">
            <th>Year</th>
            <th>Course</th>
            <th>Instructor</th>
            <th className="col-last">Student</th>
          </tr>
        </thead>
        <tbody>{recordList(instructors)}</tbody>
      </table>
    </div>
  );
}
