import moment from 'moment';

const isoPattern = 'YYYY-MM-DDTHH:mm:ss';

const getChatTime = (date = '') => {
  const create = moment(date).format('l');
  const today = moment().format('l');
  const yesterday = moment().subtract(1, 'days').format('l');
  const time = create === today ? moment(date).format('hh:mm')
    : create === yesterday ? 'Yesterday' : create;

  return time;
}

export default {
  getChatTime,
};
