import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Shop2Icon from "@mui/icons-material/Shop2";


function MenuDrawer() {
  const navigate = useNavigate();
  const [openProductMegaMenu, setOpenProductMegaMenu] = React.useState(false);
  const [orderOpen, setOrderOpen] = React.useState(false);
  const handleOpenProducts = () => {
    setOpenProductMegaMenu(!openProductMegaMenu);
    // console.log(openProductMegaMenu);
  };
  const handleOpenOrder = () => {
   setOrderOpen(!orderOpen);
 }
  const handleOpenCategory = () => {
    navigate("/category");
  };
  const listItemTextStyle = {
    fontFamily: "Noto Sans Lao",
    fontSize: "18px",
  };
  return (
    <>
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            className="link"
            sx={{
              minHeight: 48,
              boxShadow: "1px 0.5px grey",
              px: 2.5,
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              className="link"
              primary="ໜ້າຫຼັກ"
              primaryTypographyProps={{ style: listItemTextStyle }}
              onClick={() => navigate("/")}
            />
          </ListItemButton>
        </ListItem>

        {/* buy and sale product */}
        <ListItem
          onClick={handleOpenOrder}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              boxShadow: "1px 0.5px grey",
              px: 2.5,
            }}
          >
            <ListItemIcon>
              <ShoppingBagIcon />
            </ListItemIcon>
            <ListItemText
              primary="ການບໍລິການ"
              primaryTypographyProps={{ style: listItemTextStyle }}
            />
            {orderOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={orderOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => navigate("/order_products")}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                primary="ຊື້ສິນຄ້າ"
                primaryTypographyProps={{ style: listItemTextStyle }}
              />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate("/sale_products")}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText
                primary="ຂາຍສິນຄ້າ"
                primaryTypographyProps={{ style: listItemTextStyle }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* category */}
        <ListItem
          onClick={handleOpenProducts}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              boxShadow: "1px 0.5px grey",
              px: 2.5,
            }}
          >
            <ListItemIcon>
              <Shop2Icon />
            </ListItemIcon>
            <ListItemText
              primary="ຈັດການສິນຄ້າ"
              primaryTypographyProps={{ style: listItemTextStyle }}
            />
            {openProductMegaMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openProductMegaMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={handleOpenCategory} sx={{ pl: 4 }}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText
                primary="ປະເພດສິນຄ້າ"
                primaryTypographyProps={{ style: listItemTextStyle }}
              />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate("/products")}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText
                primary="ສິນຄ້າ"
                primaryTypographyProps={{ style: listItemTextStyle }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default MenuDrawer;
