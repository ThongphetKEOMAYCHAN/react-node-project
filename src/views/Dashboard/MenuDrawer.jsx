import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import { Button, Collapse } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from 'react-router-dom';

function MenuDrawer() {
     const navigate = useNavigate();
     const [openProductMegaMenu, setOpenProductMegaMenu] =
       React.useState(false);

     const handleOpenProducts = () => {
          setOpenProductMegaMenu(!openProductMegaMenu);
          // console.log(openProductMegaMenu);
     };
  
     const handleOpenCategory = () => {
          navigate("/category");
     }
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
               />
             </ListItemButton>
           </ListItem>
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
                 <HomeIcon />
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
                   <HomeIcon />
                 </ListItemIcon>
                 <ListItemText
                   primary="ປະເພດສິນຄ້າ"
                   primaryTypographyProps={{ style: listItemTextStyle }}
                 />
               </ListItemButton>
             </List>
           </Collapse>
         </List>
       </>
     );
}

export default MenuDrawer