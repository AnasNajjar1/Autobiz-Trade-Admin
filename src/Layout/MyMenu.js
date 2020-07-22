import React, { useState } from "react";
import { MenuItemLink, useTranslate } from "react-admin";
import { connect } from "react-redux";
import { getResources } from "admin-on-rest";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DirectionsCar from "@material-ui/icons/DirectionsCar";

const SubMenuLayout = ({ resources, onMenuClick }) => {
  const [openOffertoprivate, setOpenOffertoprivate] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const translate = useTranslate();
  const subMenuOffertoprivate = [
    "offertoprivateOffline",
    "offertoprivatePending",
    "offertoprivateOnSale",
    "offertoprivateAuctionFinished",
    "offertoprivateAuctionFailed",
    "offertoprivatePurchasedImmediately",
    "offertoprivateSubmissionsOnlyFinished",
    "offertoprivateSold",
  ];

  const subMenuStock = [
    "stockOffline",
    "stockPending",
    "stockOnSale",
    "stockAuctionFinished",
    "stockAuctionFailed",
    "stockPurchasedImmediately",
    "stockSubmissionsOnlyFinished",
    "stockSold",
  ];

  const facadeList = [
    "vehicle",
    "stock",
    "offertoprivate",
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

  const handleOpenOffertoprivate = () => {
    setOpenOffertoprivate(!openOffertoprivate);
  };

  const handleOpenStock = () => {
    setOpenStock(!openStock);
  };

  return (
    <div>
      <MenuItemLink
        key="offertoprivate"
        to="/offertoprivate"
        primaryText={
          <>
            <span style={{ flex: 1 }}>{translate("offerToPrivate")}</span>
            {openOffertoprivate ? <ExpandLess /> : <ExpandMore />}
          </>
        }
        leftIcon={<DirectionsCar />}
        onClick={handleOpenOffertoprivate}
      />

      <Collapse
        in={openOffertoprivate}
        timeout="auto"
        style={{ paddingLeft: 15 }}
      >
        {resources.map((item) => {
          if (
            subMenuOffertoprivate.includes(item.name) &&
            !facadeList.includes(item.name)
          ) {
            return menuLayout(item, translate(item.name), onMenuClick);
          }
        })}
      </Collapse>

      <MenuItemLink
        key="stock"
        to="/stock"
        primaryText={
          <>
            <span style={{ flex: 1 }}>{translate("stock")}</span>
            {openStock ? <ExpandLess /> : <ExpandMore />}
          </>
        }
        leftIcon={<DirectionsCar />}
        onClick={handleOpenStock}
      />
      <Collapse in={openStock} timeout="auto" style={{ paddingLeft: 15 }}>
        {resources.map((item) => {
          if (
            subMenuStock.includes(item.name) &&
            !facadeList.includes(item.name)
          ) {
            return menuLayout(item, translate(item.name), onMenuClick);
          }
        })}
      </Collapse>

      {resources.map((item) => {
        if (
          !subMenuOffertoprivate.includes(item.name) &&
          !subMenuStock.includes(item.name) &&
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
