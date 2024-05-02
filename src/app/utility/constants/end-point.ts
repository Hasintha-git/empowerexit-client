const HOST: string = 'empowerexit-28941edc4f03.herokuapp.com';

//local
// const HOST: string = '127.0.0.1';
// const PORT: string = '5000';
export const SHARESURVEY: string = 'https://empowerexit.web.app/employee-survey-management';
export const NODATA: string = 'Previous Evaluation vs Current Evaluation section will be updated upon re-running the survey';
export const NODATA1: string = 'Please share the survey with employee to get turnover predictions';

export const SECURE = true;

export const getEndpoint = (isHttps: any) => {
  // return `${isHttps ? 'https' : 'http'}://${HOST}:${PORT}/api/v1`;
  return `${isHttps ? 'https' : 'http'}://${HOST}/api/v1`;
};
