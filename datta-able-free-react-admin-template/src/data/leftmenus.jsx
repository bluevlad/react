import superagent from "superagent";
import { BASE_API } from "../config/constant";

export const fetchLeftMenuData = async () => {
  try {
    const response = await superagent.get(`${BASE_API}/main/getLeftMenu`);

    // Function to recursively map menu items
    const parseMenuItems = (menuList) => {
      return menuList.map((menu) => ({
        id: menu.menu_id ? menu.menu_id.trim() : "",
        title: menu.menu_title ? menu.menu_title.trim() : "",
        type: menu.menu_type ? menu.menu_type.trim() : "item",
        icon: menu.menu_icon ? menu.menu_icon.trim() : null,
        url: menu.menu_url ? menu.menu_url.trim() : null,
        breadcrumbs: menu.menu_breadcrumbs ? menu.menu_breadcrumbs.trim() : null,
        classes: menu.menu_classes ? menu.menu_layout.trim() : null,
        target: menu.menu_target ? menu.menu_target.trim() : null,
        external: menu.menu_external ? menu.menu_external.trim() : null,
        children: menu.children ? parseMenuItems(menu.children) : [], // Recursive processing
      }));
    };

    return parseMenuItems(response.body.items);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
};
