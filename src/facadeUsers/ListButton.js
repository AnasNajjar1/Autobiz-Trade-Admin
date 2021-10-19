import { Button } from "@material-ui/core";
import { useTranslate } from "ra-core";
import React from "react";
import { Link } from "react-router-dom";

const ListButton = (props) => {
  const { record } = props;
  const translate = useTranslate();
  return (
    <>
      <Button
        color="primary"
        component={Link}
        to={{
          pathname: `offer?filter=${JSON.stringify({ userId: record.id })}`,
        }}
      >
        {translate("offers")}
      </Button>
    </>
  );
};

export default ListButton;
