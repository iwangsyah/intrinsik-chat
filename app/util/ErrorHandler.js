export default (ErrorHanlder = async error => {
  let er = error;
  let status = 0;
  let statusText = 'Please try again';
  console.log('er: ', er);

  if (er.response) {
    const errorJson = JSON.stringify(er.response);
    console.log(`error log response ${errorJson}`);

    status = er.response.status;

    if ([500, 409, 401, 400, 422].includes(status)) {
      statusText = er.response.data.error.message || er.response.data.error.code || 'Failed';
    }
  } else if (er.request) {
    const errorJson = JSON.stringify(er.request);
    console.log(`error log request ${errorJson}`);

    status = er.request.status;

    if (er.request.status === 0) {
      statusText = 'Please check your connection';
    }
  } else {
    console.log(`error log default ${er}`);
  }

  er = {
    status,
    statusText
  };

  return er;
});
