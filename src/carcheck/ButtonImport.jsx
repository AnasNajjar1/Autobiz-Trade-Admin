// in src/comments/ApproveButton.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { showNotification } from "react-admin";
import { push } from "react-router-redux";
import { API } from "aws-amplify";

const ButtonImport = (props) => {
  const handleClick = async () => {
    const { push, record, showNotification } = props;
    try {
      const sale = await API.post(
        "b2bPlateform",
        `/carcheckImport/${record.id}`
      );
      showNotification(`Sale created ${sale.saleId}`);
      push(`/vehicle/${sale.vehicleId}/show/sale`);
    } catch (e) {
      showNotification(`ERROR ! ${e.response.data}`, "error");
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      Import
    </Button>
  );
};

ButtonImport.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
  push,
})(ButtonImport);
