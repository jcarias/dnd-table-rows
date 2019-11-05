import React, { useState } from "react";
import { Box, Paper, Typography, createMuiTheme } from "@material-ui/core";
import { swapArrayElements, uuid } from "./utils";
import SortableTable, { Actions } from "./components/SortListTest";
import { ThemeProvider } from "@material-ui/styles";
import { fontSize } from "@material-ui/system";

const dummyFields = [
  {
    id: "1",
    type: "text",
    name: "firstName",
    label: "First name"
  },
  {
    id: "2",
    type: "text",
    name: "lastName",
    label: "Last name"
  },
  {
    id: "3",
    type: "select",
    name: "gender",
    label: "Gender"
  }
];

const theme = createMuiTheme({
  typography: {
    fontFamily: "Nunito",
    fontSize: 16
  },
  overrides: {
    MuiTableCell: {
      head: {
        fontWeight: 600
      }
    }
  }
});

function App() {
  const [fields, setFields] = useState(dummyFields);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFields(swapArrayElements(fields, oldIndex, newIndex));
  };

  const addNewField = () => {
    const id = uuid();
    return {
      id,
      type: "text",
      name: id,
      label: id
    };
  };

  const itemActionHandler = (actionType, item) => {
    switch (actionType) {
      case Actions.edit:
        console.warn("UNIMPLEMENTED!: ", actionType, item);
        break;

      case Actions.delete:
        setFields(fields.filter(field => field.id !== item.id));
        break;

      case Actions.add:
        setFields([...fields, addNewField()]);
        break;

      default:
        console.log(actionType);
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box m={2} p={3} bgcolor="#F5F5F5">
        <Box pb={1}>
          <Typography>{`Drag & Drop rows`}</Typography>
        </Box>
        <Paper elevation={3}>
          <SortableTable
            items={fields}
            onSortEnd={onSortEnd}
            onItemAction={itemActionHandler}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
