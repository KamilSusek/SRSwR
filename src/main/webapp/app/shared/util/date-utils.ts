import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z } from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? moment(date, APP_LOCAL_DATETIME_FORMAT_Z).toDate() : null);

export const extractDate = date => (date ? moment(date).format('YYYY-MM-DD') : null);

export const extractTime = date => (date ? moment(date).utc().format('HH:mm') : null);

export const displayDefaultDateTime = () => moment().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);
