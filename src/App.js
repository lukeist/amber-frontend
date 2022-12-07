import "./styles/global.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { pushCourses, active } from "./store/recordsSlice";
import { pushDb } from "./store/dbSlice";
import Radio from "./components/Radio";
import Chart from "./components/Chart";
import RecordList from "./components/RecordList";
import Students from "./components/_getStudents";

function App() {
  const { records } = useSelector((state) => state);
  const { instructors } = useSelector((state) => state.records);
  const dispatch = useDispatch();
  const [years, setYears] = useState([]);
  const isGrid = instructors.length;

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      // Fetching data
      const response = await fetch(`${process.env.REACT_APP_AMBER_API}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const newRecords = await response.json();
      const students = new Students(newRecords);
      // This dispatches the whole data to keep for later use
      dispatch(pushDb(newRecords));
      // This dispatches the values for the current chart and grid
      dispatch(active(true));
      dispatch(pushCourses(students.all()));

      // This gets all years in the data and puts them in a Set() for O(1) time complexity look-up.
      const allYears = new Set(["All"]);
      for (let r of newRecords) {
        !allYears.has(r.year) && allYears.add(r.year);
      }
      setYears(Array.from(allYears).sort((a, b) => a - b));
    }

    getRecords();

    return;
  }, []);

  return (
    <div className="App">
      <div id="gradient-animator"></div>
      {!records.active ? (
        <div id="loading">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div id="container" className={isGrid ? "w-grid" : "wo-grid"}>
          <h3>{records.chartTitle}</h3>
          <Radio years={years} />
          <div>
            <div id="container-chart-grid">
              <Chart isGrid={isGrid} records={records} />
              {isGrid ? <RecordList instructors={instructors} /> : <div></div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
