import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";
import Gavel from "@material-ui/icons/Gavel";
import { useTranslate } from "react-admin";

const LinkToRelatedOffers = ({ record }) => {
  const translate = useTranslate();
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
          filter: JSON.stringify({ fileNumber: record.fileNumber }),
        }),
      }}
    >
      <Gavel /> {translate("offers")} ({record.offersCount})
    </Button>
  );
};

export default LinkToRelatedOffers;
