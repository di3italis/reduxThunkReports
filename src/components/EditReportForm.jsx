import { useParams } from 'react-router-dom';
import ReportForm from './ReportForm';
import { loadReportById, selectReportById } from '../store/reports';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const EditReportForm = () => {
  const { reportId } = useParams();
  const dispatch = useDispatch();
  const report = useSelector(selectReportById(reportId)); // populate from Redux store

  useEffect(() => {
    dispatch(loadReportById(reportId));
  }, [dispatch])

  if (!report) return(<></>);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(report).length > 1 && (
      <>
        <ReportForm
          report={report}
          formType="Update Report"
        />
      </>
    )
  );
};

export default EditReportForm;

