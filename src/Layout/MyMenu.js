import React, { useState } from "react";
import { MenuItemLink, useTranslate } from "react-admin";
import { connect } from "react-redux";
import { getResources } from "admin-on-rest";

const SubMenuLayout = ({ resources, onMenuClick }) => {
  const translate = useTranslate();

  const notInMenuList = [
    "facadeBrand",
    "facadeModel",
    "facadePointOfSale",
    "status",
    "groupUser",
    "facadeCompany",
    "carcheckImport",
    "partner",
    "partnerOffers",
  ];

  return (
    <div>
      {resources.map((item) => {
        if (!notInMenuList.includes(item.name)) {
          return menuLayout(item, translate(item.name), onMenuClick);
        }
      })}
    </div>
  );
};

const menuLayout = (item, translation, onMenuClick) => {
  return (
    <MenuItemLink
      key={item.name}
      to={`/${item.name}`}
      primaryText={translation}
      leftIcon={<item.icon />}
      onClick={onMenuClick}
    />
  );
};

const mapStateToProps = (state) => ({
  resources: getResources(state),
});

export default connect(mapStateToProps)(SubMenuLayout);
