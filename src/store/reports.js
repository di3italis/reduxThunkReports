import { createSelector } from 'reselect';

/** Action Type Constants: */
export const LOAD_REPORTS = "reports/LOAD_REPORTS";
export const RECEIVE_REPORT = "reports/RECEIVE_REPORT";
export const UPDATE_REPORT = "reports/UPDATE_REPORT";
export const REMOVE_REPORT = "reports/REMOVE_REPORT";

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports,
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report,
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report,
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId,
});

/** Thunk Action Creators: */

// Your code here
export const loadReportsThunk = () => async (dispatch) => {
  const res = await fetch("/api/reports");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadReports(data));
  } else {
    return res;
  }
};

export const deleteReportThunk = (id) => async dispatch => {
  const res = await fetch(`/api/reports/${id}`, {
    method: 'DELETE',
  });

  if(res.ok){
    dispatch(removeReport(id))
  }

  else return res;
};

export const loadReportById = (id) => async dispatch => {
  const res = await fetch(`/api/reports/${id}`);

  if(res.ok){
    const data = await res.json();
    dispatch(receiveReport(data))
  }
  else return res;
};

export const createReportThunk = (report) => async dispatch => {
  const res = await fetch('/api/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report)
  })

  if(res.ok){
    const data = await res.json();
    dispatch(receiveReport(data))
    return data; 
  }
  else {
    const error = new Error("Failed");
    const {errors} = await res.json();
    error.errors = errors;
    throw error;
  }
};

export const updateReportThunk = (report) => async dispatch => {
  const res = await fetch(`/api/reports/${report.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(report)
  });

  if(res.ok){
    const data = await res.json();
    dispatch(editReport(data));
    return data;
  }

  else {
    const error = new Error('Failed');
    const {errors} = await res.json();
    error.errors = errors;
    throw error;
  }
}

/** Selectors: */
const reportSelector = (state) => state.reports;

export const selectReports = createSelector(
  reportSelector,
  (reports) => Object.values(reports)
);

const reportByIdSelector = (id) => state => state.reports[id];
export const selectReportById = createSelector(reportByIdSelector, (report) => report)

/** Reducer: */

/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS: {
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    }
    case RECEIVE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case UPDATE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT: {
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    }
    default:
      return state;
  }
};

export default reportsReducer;
