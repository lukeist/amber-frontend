import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { pushInstructors } from "../store/recordsSlice";
import Students from "./_getStudents";

export default function Chart({ records, isGrid }) {
  const { data } = useSelector((state) => state.db);
  const dispatch = useDispatch();
  const colors = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"]; // This will be created later as a function to automatically add more colors if there's more courses added

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };

  const handleGrid = (year, course) => {
    const students = new Students(data);
    dispatch(pushInstructors(students.byInstructor(year, course)));
  };

  // mobile has different animation style
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      id="chart"
      className={
        isMobile && isGrid
          ? ""
          : isMobile && !isGrid
          ? "chart-left"
          : !isMobile && isGrid
          ? "chart-left"
          : "chart-center"
      }
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={records.courses}
            color="#000000"
            dataKey="attended"
            nameKey="title"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          >
            {records.active &&
              records.courses.map((course, index) => (
                <Cell
                  className="cell"
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  onClick={() => handleGrid(course.year, course.title)}
                />
              ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    // </motion.div>
  );
}
