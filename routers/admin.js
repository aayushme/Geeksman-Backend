const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const express = require('express')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose=require('mongoose')
AdminBro.registerAdapter(AdminBroMongoose)


const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding:{
      logo:'https://www.google.com/search?q=geeksman+logo&sxsrf=ALeKk03-pCKEQLQMX81lBh44M6N4pPS_Qw:1610784282411&tbm=isch&source=iu&ictx=1&fir=AMJ0MkTv5kPXXM%252CG7BgHy8x6s6_UM%252C_&vet=1&usg=AI4_-kTPz_-7hFAt8XPgjWMvbRmAUxz2tg&sa=X&ved=2ahUKEwjt_NiH_5_uAhU2_XMBHVr1DCIQ9QF6BAgLEAE&cshid=1610784437723400#imgrc=AMJ0MkTv5kPXXM',
      companyName:'Geeksman',
  }
})
const ADMIN={
    email:process.env.ADMIN_EMAIL||'paragthakur56@gmail.com',
    password:process.env.ADMIN_PASSWORD||'geeksman567'
}
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    cookieName:process.env.ADMIN_COOKIE_NAME||'admin-bro',
    cookiePassword:process.env.ADMIN_COOKIE_PASS||'this-is-the-password-for-the-admin-that-we-are-using-here',
    authenticate:async(email,password)=>{
       if(email===ADMIN.email&&password===ADMIN.password){
            return ADMIN
       }
       return null
    }
})
module.exports=router