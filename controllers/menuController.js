const { menu } = require('../db/models');
const getAllMenu = async (req, res) => {
  try {
    const result = await menu.findAll();

    const menus = result.map((access) => ({
      id: access.id,
      parentId: access.parentId === null ? access.parentId : Number(access.parentId),
      name: access.name,
      path: access.path,
      icon: access.icon,
      sortOrder: access.sortOrder,
    }));
    return res.json({
      success: true,
      data: buildMenuTree(menus),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const buildMenuTree = (menus, parentId = null) => {
  return menus
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => ({
      ...item,
      children: buildMenuTree(menus, item.id),
    }));
};

module.exports = {
  buildMenuTree,
  getAllMenu,
};
