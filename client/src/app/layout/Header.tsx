import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { Badge, List, ListItem } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header(props: any) {
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Switch defaultChecked onClick={props.handleMode} color="default" />

            <Typography variant="h6">Luck-Restor</Typography>
          </Box>

          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem
                key={title}
                component={NavLink}
                sx={navStyles}
                to={path}
              >
                {title}
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge color="secondary" badgeContent={4}>
              <ShoppingCartIcon />
            </Badge>
            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem component={NavLink} sx={navStyles} to={path}>
                  {title}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
