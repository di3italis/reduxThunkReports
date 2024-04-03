import { Link } from "react-router-dom";
import ReportIndexItem from "./ReportIndexItem";
import { resetDatabase } from "../mocks/storage";
import { selectReports } from "../store/reports";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadReportsThunk } from "../store/reports";

const ReportsIndex = () => {
  const reports = useSelector(selectReports); // populate from Redux store
  console.log(reports);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadReportsThunk());
  }, [dispatch]);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <ul>
        {reports.map((report) => (
          <ReportIndexItem report={report} key={report.id} />
        ))}
      </ul>
      <Link className="back-button new" to="/reports/new">
        New Report
      </Link>
      <button onClick={resetDatabase}>Reset the Database</button>
    </section>
  );
};

export default ReportsIndex;
