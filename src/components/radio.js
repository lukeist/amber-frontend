import { motion } from "framer-motion";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  pushCourses,
  pushChartYear,
  pushChartTitle,
  pushInstructors,
} from "../store/recordsSlice";
import Students from "./_getStudents";

export default function Radio({ years }) {
  const { data } = useSelector((state) => state.db);
  const { year, instructors } = useSelector((state) => state.records);
  const dispatch = useDispatch();

  const switchRadio = (data, year, course) => {
    const students = new Students(data);
    dispatch(pushChartYear(year));
    typeof year === "number"
      ? dispatch(pushChartYear(year)) &&
        dispatch(pushChartTitle(`Students by Course ${year}`)) &&
        dispatch(pushCourses(students.byCourse(year))) &&
        dispatch(pushInstructors(students.byInstructor(year, course)))
      : dispatch(pushChartYear(year)) &&
        dispatch(pushChartTitle("Students by All Courses")) &&
        dispatch(pushCourses(students.all())) &&
        dispatch(pushInstructors(students.byInstructor(year, course)));
  };

  return (
    <ul id="container-radio">
      <li id="radio-title" className="bold">
        Years:
      </li>
      {years.map((y, index) => (
        <motion.li
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          key={index}
          className="radio"
          onClick={() =>
            switchRadio(data, y, instructors.length && instructors[0].course)
          }
        >
          {year === y ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
          {y}
        </motion.li>
      ))}
    </ul>
  );
}
