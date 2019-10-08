import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";
import Gavel from "@material-ui/icons/Gavel";

const LinkToRelatedOffers = ({ record }) => {
  if (record.offersCount === 0) {
    return null;
  }
  return (
    <Button
      component={Link}
      size="small"
      color="primary"
      to={{
        pathname: "/offer",
        search: stringify({
          page: 1,
          perPage: 25,
          sort: "id",
          order: "DESC",
          filter: JSON.stringify({ fileNumber: record.fileNumber })
        })
      }}
    >
      <Gavel /> Offers ({record.offersCount})
    </Button>
  );
};

export default LinkToRelatedOffers;
