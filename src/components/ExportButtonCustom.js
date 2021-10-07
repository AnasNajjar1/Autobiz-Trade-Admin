import * as React from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";
import DownloadIcon from "@material-ui/icons/GetApp";
import {
  Button,
  fetchRelatedRecords,
  useDataProvider,
  useNotify,
  useListContext,
} from "react-admin";

const ExportButtonCustom = (props) => {
  const {
    maxResults = 1000,
    onClick,
    label = "ra.action.export",
    icon = defaultIcon,
    exporter: customExporter,
    filterPermanent,
    ...rest
  } = props;
  const {
    filterValues,
    resource,
    currentSort,
    exporter: exporterFromContext,
    total,
  } = useListContext(props);
  const exporter = customExporter || exporterFromContext;
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const handleClick = useCallback(
    (event) => {
      dataProvider
        .getList(resource, {
          sort: currentSort,
          filter: { ...filterValues, ...filterPermanent },
          pagination: { page: 1, perPage: maxResults },
        })
        .then(
          ({ data }) =>
            exporter &&
            exporter(
              data,
              fetchRelatedRecords(dataProvider),
              dataProvider,
              resource
            )
        )
        .catch((error) => {
          console.error(error);
          notify("ra.notification.http_error", "warning");
        });
      if (typeof onClick === "function") {
        onClick(event);
      }
    },
    [
      currentSort,
      dataProvider,
      exporter,
      filterValues,
      maxResults,
      notify,
      onClick,
      resource,
    ]
  );

  return (
    <Button
      onClick={handleClick}
      label={label}
      disabled={total === 0}
      {...sanitizeRestProps(rest)}
    >
      {icon}
    </Button>
  );
};

const defaultIcon = <DownloadIcon />;

const sanitizeRestProps = ({ basePath, filterValues, resource, ...rest }) =>
  rest;

ExportButtonCustom.propTypes = {
  basePath: PropTypes.string,
  exporter: PropTypes.func,
  filterValues: PropTypes.object,
  label: PropTypes.string,
  maxResults: PropTypes.number,
  resource: PropTypes.string,
  sort: PropTypes.exact({
    field: PropTypes.string,
    order: PropTypes.string,
  }),
  icon: PropTypes.element,
  filterPermanent: PropTypes.object,
};

export default ExportButtonCustom;
