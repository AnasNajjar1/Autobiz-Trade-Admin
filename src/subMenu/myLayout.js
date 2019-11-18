import React from "react";
import { Layout } from "react-admin";
import SubMenuLayout from "./subMenuLayout";

const MyLayout = props => <Layout {...props} menu={SubMenuLayout} />;

export default MyLayout;
