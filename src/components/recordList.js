// Framer Motion variants
const { motion } = require("framer-motion");
const grid = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};
const grids = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

// This shows grid items on the screen
const Record = ({ record, length }) => (
  <motion.tr variants={grid}>
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
  </motion.tr>
);

export default function RecordList({ instructors }) {
  function recordList(recordsInstructors) {
    return recordsInstructors.map((record, index, recordsInstructors) => (
      <Record key={index} record={record} length={recordsInstructors.length} />
    ));
  }

  return (
    <motion.div
      variants={grids}
      animate="show"
      initial="hidden"
      id="recordList"
    >
      <table className="table table-striped">
        <motion.caption variants={grid}>
          <h2>{instructors[0].course}</h2>
        </motion.caption>

        <thead>
          <motion.tr variants={grid} id="tr-header">
            <th className="td-year">Year</th>
            <th>Course</th>
            <th>Instructor</th>
            <th className="col-last">Student</th>
          </motion.tr>
        </thead>
        <tbody>{recordList(instructors)}</tbody>
      </table>
    </motion.div>
  );
}
