// import React, { useState } from "react";
// import { MenuItemLink, useTranslate } from "react-admin";
// import { connect } from "react-redux";
// import { getResources } from "admin-on-rest";

// const SubMenuLayout = ({ resources, onMenuClick }) => {
//   const translate = useTranslate();

//   const notInMenuList = [
//     "facadeBrand",
//     "facadeModel",
//     "facadePointOfSale",
//     "status",
//     "groupUser",
//     "facadeCompany",
//     "carcheckImport",
//     "partner",
//     "partnerOffers",
//   ];

//   return (
//     <div>
//       {resources.map((item) => {
//         if (!notInMenuList.includes(item.name)) {
//           return menuLayout(item, translate(item.name), onMenuClick);
//         }
//       })}
//     </div>
//   );
// };

// const menuLayout = (item, translation, onMenuClick) => {
//   return (
//     <MenuItemLink
//       key={item.name}
//       to={`/${item.name}`}
//       primaryText={translation}
//       leftIcon={<item.icon />}
//       onClick={onMenuClick}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   resources: getResources(state),
// });

// export default connect(mapStateToProps)(SubMenuLayout);

import React, { useState } from "react";
import LabelIcon from "@material-ui/icons/Label";
import {
  crudGetOne,
  DashboardMenuItem,
  getResources,
  MenuItemLink,
  translate,
} from "react-admin";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import DefaultIcon from "@material-ui/icons/ViewList";
import CustomMenuItem from "./CustomMenuItem";

const Menu = ({
  classes,
  className,
  dense,
  hasDashboard,
  onMenuClick,
  open,
  pathname,
  resources,
  translate,
  logout,
  ...rest
}) => {
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
  const handleToggle = (parent) => {
    setState((state) => ({ [parent]: !state[parent] }));
  };

  const isParent = (resource) => {
    return resource.options?.isMenuParent;
  };

  const initialExpansionState = {};

  resources.forEach((res) => {
    if (isParent(res)) {
      initialExpansionState[res.name] = false;
    }
  });
  const [state, setState] = useState(initialExpansionState);
  const resRenderGroup = [];
  /**
   * Pushing the orphan resources for rendering
   * below other menu items
   */
  console.log(resources);
  resRenderGroup.push(
    resources
      .filter(
        (r) =>
          r.options &&
          !("menuParent" in r.options) &&
          !("isMenuParent" in r.options) &&
          !notInMenuList.includes(r.name)
      )
      .map((independentResource) => (
        <MenuItemLink
          key={independentResource.name}
          to={`/${independentResource.name}`}
          primaryText={translate(independentResource.name)}
          leftIcon={
            independentResource.icon ? (
              <independentResource.icon />
            ) : (
              <DefaultIcon />
            )
          }
          onClick={onMenuClick}
          dense={dense}
        />
      ))
  );

  /**
   * Pushing the menu tree for rendering
   */
  resRenderGroup.push(
    resources
      .filter((r) => isParent(r))
      .map((parentResource) => (
        <CustomMenuItem
          handleToggle={() => handleToggle(parentResource.name)}
          isOpen={state[parentResource.name]}
          sidebarIsOpen={open}
          name={translate(parentResource.options.label)}
          icon={parentResource.icon ? <parentResource.icon /> : <LabelIcon />}
          dense={dense}
        >
          {
            // eslint-disable-next-line
            resources
              .filter((r) => r.options?.menuParent === parentResource.name)
              .map((childResource) => (
                <MenuItemLink
                  key={childResource.name}
                  to={`/${childResource.name}`}
                  primaryText={translate(childResource.options.label)}
                  leftIcon={
                    childResource.icon ? (
                      <childResource.icon />
                    ) : (
                      <DefaultIcon />
                    )
                  }
                  onClick={onMenuClick}
                  dense={dense}
                />
              ))
          }
        </CustomMenuItem>
      ))
  );

  return (
    <div>
      <div
        style={{ marginTop: "10px" }}
        className={classnames(classes.main, className)}
        {...rest}
      >
        {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}
        {resRenderGroup}
      </div>
    </div>
  );
};

Menu.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  dense: PropTypes.bool,
  hasDashboard: PropTypes.bool,
  logout: PropTypes.element,
  onMenuClick: PropTypes.func,
  open: PropTypes.bool,
  pathname: PropTypes.string,
  resources: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  onMenuClick: () => null,
};

const mapStateToProps = (state) => ({
  open: state.admin.ui.sidebarOpen,
  resources: getResources(state),
  pathname: state.router.location.pathname,
});

const enhance = compose(
  translate,
  connect(mapStateToProps, { crudGetOne }, null, {
    areStatePropsEqual: (prev, next) =>
      prev.resources.every((value, index) => value === next.resources[index]) &&
      prev.pathname === next.pathname &&
      prev.open === next.open,
  }),
  withStyles(null)
);

export default enhance(Menu);
