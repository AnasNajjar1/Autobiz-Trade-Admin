import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { showNotification, useTranslate, useRefresh } from "react-admin";
import { push } from "react-router-redux";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

const ButtonChangeValidationStatus = (props) => {
  const translate = useTranslate();
  const refresh = useRefresh();

  const handleChangeStatus = async (newValidationStatus) => {
    const { record, showNotification } = props;

    try {
      await API.put("b2bPlateform", `/admin/sale/${record.id}`, {
        body: {
          validationStatus: newValidationStatus,
        },
      }).then((response) => {
        refresh();
        showNotification(`Sale ${record.id} updated`, "info");
      });
    } catch (e) {
      showNotification(`ERROR ! ${e.message}`, "error");
    }
  };

  const handleDeleteSale = async () => {
    const { record, showNotification } = props;

    try {
      await API.del("b2bPlateform", `/admin/sale/${record.id}`).then(
        (response) => {
          refresh();
          showNotification(`Sale ${record.id} deleted`, "info");
        }
      );
    } catch (e) {
      console.log(e);
      showNotification(`Can't delete this sale`, "error");
    }
  };

  if (props.record && props.record.validationStatus === "VALIDATED") {
    return (
      <>
        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={() => handleChangeStatus("CANCELED")}
        >
          {translate("cancel")}
        </Button>
      </>
    );
  }

  if (props.record && props.record.validationStatus === "DRAFT") {
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => handleChangeStatus("VALIDATED")}
        >
          {translate("validate")}
        </Button>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={() => handleDeleteSale()}
        >
          {translate("delete")}
        </Button>
      </>
    );
  }

  if (props.record && props.record.validationStatus === "CANCELED") {
    return (
      <Button
        variant="contained"
        color="inherit"
        size="small"
        onClick={() => handleDeleteSale()}
      >
        {translate("delete")}
      </Button>
    );
  }

  return <></>;
};

ButtonChangeValidationStatus.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
  push,
})(ButtonChangeValidationStatus);
