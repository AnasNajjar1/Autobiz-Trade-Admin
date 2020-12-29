export const LogActionLabel = ({ id, record, resource }) => {
  switch (record.action) {
    case "C":
      return "CREATE";
    case "R":
      return "READ";
    case "U":
      return "UPDATE";
    case "D":
      return "DELETE";

    default:
      break;
  }
};
