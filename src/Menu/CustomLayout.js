import React from "react";
import { Layout } from "react-admin";
import MenuLayout from "./MenuLayout";

const CustomLayout = props => <Layout {...props} menu={MenuLayout} />;

export default CustomLayout;
