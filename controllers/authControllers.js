const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const { user, role, userRole, menu, roleAccess } = require('../db/models');
const { passwordDecrypt, generateAccessToken } = require('../helpers/authHelpers');
const { buildMenuTree } = require('./menuController');

const v = new Validator();

const usersLogin = async (req, res) => {
  try {
    const schema = {
      username: 'string|empty:false',
      password: 'string|empty:false',
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        success: false,
        message: validate[0].message,
      });
    }

    const { username, password } = req.body;

    const resultUser = await user.findOne({
      where: { username },
      attributes: ['id', 'username', 'fullName', 'password'],
      include: [
        {
          model: role,
          as: 'roles',
          through: { attributes: [] },
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!resultUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    // validation Password
    const passwordValid = await passwordDecrypt(password, resultUser.password);
    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const resulRole = resultUser?.roles;
    // delete password
    delete resultUser?.dataValues['password'];
    //  more than 1 role
    if (resulRole.length > 1) {
      // generate jwt accessTOken
      const accessToken = generateAccessToken({
        ...resultUser?.dataValues,
        tokenType: 'selectRole',
      });
      return res.json({
        success: true,
        data: {
          menus: [],
          users: resultUser,
          accessToken,
        },
      });
    }

    // generate menu
    const menus = await getMenusByRole(resulRole[0].id);
    // generate jwt accessTOken
    const accessToken = generateAccessToken({
      ...resultUser?.dataValues,
    });

    return res.json({
      success: true,
      data: { menus, users: resultUser, accessToken },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const selectRole = async (req, res) => {
  try {
    const schema = {
      rolesId: 'number|empty:false',
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        success: false,
        message: validate[0].message,
      });
    }

    const { rolesId } = req.body;

    // users id using jwt devoded
    const usersId = req?.user?.id;
    const resultUserRole = await userRole.findOne({
      where: { rolesId, usersId },
      include: [
        {
          model: user,
          as: 'user',
          attributes: ['id', 'username', 'fullName'],
        },
        {
          model: role,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!resultUserRole) {
      return res.status(403).json({
        success: false,
        message: 'User does not have this role',
      });
    }

    // generate menu
    const menus = await getMenusByRole(rolesId);

    // generate jwt accessTOken
    const accessToken = generateAccessToken({
      ...resultUserRole?.user?.dataValues,
      roles: [resultUserRole.role],
    });

    const resData = {
      menus,
      user: {
        ...resultUserRole?.user?.dataValues,
        roles: [resultUserRole.role],
      },
      accessToken,
    };

    return res.json({
      success: true,
      data: resData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMenusByRole = async (rolesId) => {
  const accesses = await roleAccess.findAll({
    where: { rolesId },
    include: [
      {
        model: menu,
        as: 'menu',
      },
    ],
    order: [[{ model: menu, as: 'menu' }, 'sortOrder', 'ASC']],
  });

  const menus = accesses.map((access) => ({
    id: access.menu.id,
    parentId: access.menu.parentId === null ? access.menu.parentId : Number(access.menu.parentId),
    name: access.menu.name,
    path: access.menu.path,
    icon: access.menu.icon,
    sortOrder: access.menu.sortOrder,
  }));

  return buildMenuTree(menus);
};

module.exports = {
  usersLogin,
  selectRole,
};
