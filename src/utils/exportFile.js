import moment from "moment";

export const getCreatedAtInterval = (startDateTimeMin, endDateTimeMax) => {
  if (!startDateTimeMin && !endDateTimeMax) {
    const from = formatDate(subtractFourMonths(new Date()));
    const to = formatDate(getDate());
    return [from, to];
  }
  if (startDateTimeMin && !endDateTimeMax) {
    const from = formatDate(getDate(startDateTimeMin));
    const to = formatDate(addFourMonths(startDateTimeMin));
    return [from, to];
  }
  if (!startDateTimeMin && endDateTimeMax) {
    const from = formatDate(subtractFourMonths(endDateTimeMax));
    const to = formatDate(getDate(endDateTimeMax));
    return [from, to];
  }
  if (startDateTimeMin && endDateTimeMax) {
    let from = getDate(startDateTimeMin);
    let to = getDate(endDateTimeMax);

    if (to.diff(from, "months") > 4) to = addFourMonths(startDateTimeMin);
    from = formatDate(from);
    to = formatDate(to);
    return [from, to];
  }
};

const addFourMonths = (date) => moment(date).add(4, "months");
const subtractFourMonths = (date) => moment(date).subtract(4, "months");
const formatDate = (date) => date.format("YYYY-MM-DD HH:mm:ss");
const getDate = (date) => (date ? moment(new Date(date)) : moment(new Date()));
