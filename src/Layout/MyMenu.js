import React, { useState } from "react";
import { MenuItemLink, useTranslate } from "react-admin";
import { connect } from "react-redux";
import { getResources } from "admin-on-rest";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DirectionsCar from "@material-ui/icons/DirectionsCar";

const SubMenuLayout = ({ resources, onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const translate = useTranslate();
  const subMenu = [
    "offline",
    "pending",
    "onSale",
    "auctionFinished",
    "auctionFailed",
    "purchasedImmediately",
    "submissionsOnlyFinished",
    "sold",
  ];
  const facadeList = [
    "vehicle",
    "facadeBrand",
    "facadeModel",
    "facadePointOfSale",
    "status",
    "facadeUser",
    "facadeCompany",
    "carcheckImport",
    "partner",
    "partnerOffers",
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <MenuItemLink
        key="vehicle"
        to="/vehicle"
        primaryText={
          <>
            <span style={{ flex: 1 }}>{translate("vehicles")}</span>
            {open ? <ExpandLess /> : <ExpandMore />}
          </>
        }
        leftIcon={<DirectionsCar />}
        onClick={handleClick}
      />
      <Collapse in={open} timeout="auto" style={{ paddingLeft: 15 }}>
        {resources.map((item) => {
          if (subMenu.includes(item.name) && !facadeList.includes(item.name)) {
            return menuLayout(item, translate(item.name), onMenuClick);
          }
        })}
      </Collapse>
      {resources.map((item) => {
        if (
          !subMenu.includes(item.name) &&
          item.name !== "vehicles" &&
          !facadeList.includes(item.name)
        ) {
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
