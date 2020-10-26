import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { showNotification, useTranslate } from "react-admin";
import { push } from "react-router-redux";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

const ButtonGroupUser = (props) => {
  const translate = useTranslate();
  const handleCreate = async () => {
    const { push, record, showNotification } = props;

    try {
      const groupUser = await API.post("b2bPlateform", `/admin/groupUser`, {
        body: {
          autobizUserId: props.record.id,
        },
      });

      push(`/groupUser/${groupUser.id}`);
      showNotification(`User created ${groupUser.id}`);
    } catch (e) {
      showNotification(`ERROR ! ${e.message}`);
    }
  };

  if (props.record.groupUserId) {
    return (
      <Button
        color="primary"
        component={Link}
        to={{ pathname: `groupUser/${props.record.groupUserId}` }}
      >
        {translate("configure")}
      </Button>
    );
  } else {
    return (
      <Button color="primary" onClick={handleCreate}>
        {translate("create")}
      </Button>
    );
  }
};

ButtonGroupUser.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
  push,
})(ButtonGroupUser);
