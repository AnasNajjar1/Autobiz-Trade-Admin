import People from "@material-ui/icons/People";

import { Groups } from "./Groups";
import { CreateGroup, EditGroup, ShowGroup } from "./Group";

export default {
  list: Groups,
  show: ShowGroup,
  edit: EditGroup,
  create: CreateGroup,
  icon: People,
};
