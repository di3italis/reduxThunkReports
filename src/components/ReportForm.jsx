import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { createReportThunk } from '../store/reports';
import { updateReportThunk } from '../store/reports';

const ReportForm = ({ report, formType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [understanding, setUnderstanding] = useState(report?.understanding);
  const [improvement, setImprovement] = useState(report?.improvement);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    report = { ...report, understanding, improvement };

    if(formType === 'Create Report'){
      try {
        const success = await dispatch(createReportThunk(report));
        navigate(`/reports/${success.id}`)
      }
  
      catch(e){
        setErrors(e.errors)
      }
    }

    if(formType === 'Update Report'){
      try {
        const success = await dispatch(updateReportThunk(report));
        navigate(`/reports/${success.id}`)
      }
  
      catch(e){
        setErrors(e.errors)
      }
    }
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{errors.understanding}</div>
      <label>
        Understanding:
        <input
          type="text"
          value={understanding}
          onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <div className="errors">{errors.improvement}</div>
      <label>
        Improvement:
        <textarea
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default ReportForm;
