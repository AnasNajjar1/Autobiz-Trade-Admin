import React, { useState } from "react";
import { MenuItemLink } from "react-admin";
import { connect } from "react-redux";
import { getResources } from "admin-on-rest";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DirectionsCar from "@material-ui/icons/DirectionsCar";

const SubMenuLayout = ({ resources, onMenuClick }) => {
  console.log("ressources", resources);
  const [open, setOpen] = useState(false);
  const subMenu = [
    "offline",
    "onSale",
    "auctionFinished",
    "auctionFailed",
    "purchasedImmediately",
    "sold"
  ];
  const facadeList = [
    "vehicle",
    "facadeBrand",
    "facadeModel",
    "facadePointOfSale",
    "status",
    "facadeUser",
    "carcheckImport"
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
            <span style={{ flex: 1 }}>vehicle</span>
            {open ? <ExpandLess /> : <ExpandMore />}
          </>
        }
        leftIcon={<DirectionsCar />}
        onClick={handleClick}
      />
      <Collapse in={open} timeout="auto" style={{ paddingLeft: 15 }}>
        {resources.map(item => {
          if (subMenu.includes(item.name) && !facadeList.includes(item.name)) {
            return menuLayout(item, onMenuClick);
          }
        })}
      </Collapse>
      {resources.map(item => {
        if (
          !subMenu.includes(item.name) &&
          item.name !== "vehicles" &&
          !facadeList.includes(item.name)
        ) {
          return menuLayout(item, onMenuClick);
        }
      })}
    </div>
  );
};

const menuLayout = (item, onMenuClick) => (
  <MenuItemLink
    key={item.name}
    to={`/${item.name}`}
    primaryText={item.name}
    leftIcon={<item.icon />}
    onClick={onMenuClick}
  />
);

const mapStateToProps = state => ({
  resources: getResources(state)
});

export default connect(mapStateToProps)(SubMenuLayout);
