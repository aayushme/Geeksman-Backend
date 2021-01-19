const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const express = require('express')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const AdminUser = require("../models/AdminUser");
const session=require('express-session')
const mongoStore=require('connect-mongo')(session)
AdminBro.registerAdapter(AdminBroMongoose)
const canEditmodels = ({ currentAdmin, record }) => {
    return (
      currentAdmin &&
      (currentAdmin.role === "admin" ||
        currentAdmin._id === record.param("ownerId"))
    );
  };
  
  const canModifyUsers = ({ currentAdmin }) =>
    currentAdmin && currentAdmin.role === "admin";
  
const adminBro = new AdminBro({
  databases: [mongoose],
  resources:[
    {
        resource: AdminUser,
        options:{
          properties: {
            encryptedpassword: {
              isVisible: false,
            },
            password: {
              type: "string",
              isVisible: {
                list: false,
                edit: true,
                filter: false,
                show: false,
              },
            },
          },
          actions: {
            new: {
              before: async (request) => {
                if (request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encryptedpassword: await bcrypt.hash(
                      request.payload.password,
                      10
                    ),
                    password: undefined,
                  };
                }
                return request;
              },
              edit: { isAccessible: canModifyUsers },
              delete: { isAccessible: canModifyUsers },
              new: { isAccessible: canModifyUsers },
            },
          },
        },
      }   
   
  ],
  rootPath: '/admin',
  branding:{
      logo:'https://www.google.com/search?q=geeksman+logo&sxsrf=ALeKk03-pCKEQLQMX81lBh44M6N4pPS_Qw:1610784282411&tbm=isch&source=iu&ictx=1&fir=AMJ0MkTv5kPXXM%252CG7BgHy8x6s6_UM%252C_&vet=1&usg=AI4_-kTPz_-7hFAt8XPgjWMvbRmAUxz2tg&sa=X&ved=2ahUKEwjt_NiH_5_uAhU2_XMBHVr1DCIQ9QF6BAgLEAE&cshid=1610784437723400#imgrc=AMJ0MkTv5kPXXM',
      companyName:'Geeksman',
  }
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
    cookiePassword:
      process.env.ADMIN_COOKIE_PASS ||
      "this-is-the-password-for-the-admin-that-we-are-using-here",
    authenticate: async (email, password) => {
      let user
      try{
          user=await AdminUser.findOne({email})
      }catch(err){
          console.log(err)
      }
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedpassword);
        if (matched) {
          return user;
        }
      }
      return false;
    },
},null,{
    resave:false,
    saveUninitialized:true,
    store:new mongoStore({mongooseConnection:mongoose.connection})
})
module.exports=router