import React, { useEffect, useState } from "react";
import { fetchLeftMenuData } from "./data/leftmenus";

const MenuItems = () => {
  const [menuData, setMenuData] = useState([]); // Ensure it's an array

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await fetchLeftMenuData();
        setMenuData(items || []); // Fallback to empty array
      } catch (error) {
        console.error("Failed to fetch menu data", error);
        setMenuData([]); // Ensure it's always an array
      }
    };

    loadMenu();
  }, []);

  return (
    <nav>
      <ul>
        {Array.isArray(menuData) && menuData.length > 0 ? (
          menuData.map((menu) => (
            <li key={menu.id}>
              <a href={menu.url}>{menu.title}</a>
              {menu.children && menu.children.length > 0 && (
                <ul>
                  {menu.children.map((child) => (
                    <li key={child.id}>
                      <a href={child.url}>{child.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <li>Loading...</li> // Prevents errors while data is loading
        )}
      </ul>
    </nav>
  );
};

export default MenuItems;
