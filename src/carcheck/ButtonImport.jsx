// in src/comments/ApproveButton.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { showNotification } from "react-admin";
import { push } from "react-router-redux";
import { API } from "aws-amplify";

const ButtonImport = props => {
  const handleClick = async () => {
    const { push, record, showNotification } = props;
    try{
      const vehicle = await API.post(
        "b2bPlateform",
        `/carcheckImport/${record.id}`
      );
      showNotification(`Vehicle created ${vehicle.id}`);
      push(`/vehicle/${vehicle.id}`);
    }
    catch(e){
      showNotification(`ERROR ! ${e.message}`);
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
  showNotification: PropTypes.func
};

export default connect(
  null,
  {
    showNotification,
    push
  }
)(ButtonImport);
