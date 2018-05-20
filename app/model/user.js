module.exports = app => {
  const { INTEGER, STRING, DATE, UUID, UUIDV4 } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(50),
      allowNull: false,
    },
    // email: {
    //   type: STRING(50),
    //   allowNull: true,
    // },
    // phone: {
    //   type: STRING(20),
    //   allowNull: true,
    // },
    // // role: {
    // //   type: INTEGER(4),
    // //   allowNull: false,
    // //   defaultValue: ROLE_CUSTOMER,
    // // },
    // createTime: {
    //   type: DATE,
    //   allowNull: false,
    //   defaultValue: new Date(),
    // },
    // updateTime: {
    //   type: DATE,
    //   allowNull: false,
    //   defaultValue: new Date(),
    // },
  }, {
    timestamps: false,
    tableName: 'user',
  });

  User.beforeBulkUpdate(user => {
    user.attributes.updateTime = new Date();
    return user;
  });

  User.findByName = async userName => {
    const user = this.findOne({
      where:{
        user_name: userName
      }
    });
    return user;
  };

  // UserModel.create = async user => {
  //   this.create(user)
  // }

  // User.beforeCreate((user) => {
  //   console.log(user)
  //   return user
  // })

  return User;
};