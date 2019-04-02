const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()
const { Users,Categorys,Drinks,connect } = require('../models')
const currentUser = require('../models/currentUser')

const urlencodedParser = bodyParser.urlencoded({extended: true})

connect()

router.get('/users/login',function(request,response){
    response.render('my/login')
})

router.post('/users/session',urlencodedParser,async function(request,response){
    const { username, password } = request.body
    console.log("############# user : " +  username)
    currentUser.set(username)
    console.log("############# user : " +  currentUser.get())
    //find user password
    const user = await Users.findOne({where: {username:username,password:password}})
    console.log("############# user : " +  user)
    console.log("############# user : " + JSON.stringify(user, null, 4))
    if( user !== null && typeof(user) !== undefined && user.username == username){
        response.redirect(`/beverages/drinks`) //page search
    }else{
        response.redirect(`/beverages/users/login`) //page login
    }
 })

 router.get('/users/sign_up',function(request,response){
    console.log("############ sign up ")
    response.render('my/signup')
})

router.post('/users',urlencodedParser,async function(request,response){
    console.log("############ create user")
    const { username, password } = request.body
    console.log("############ user : " + username + " password : " + password)
    await Users.create({username:username,password:password})
    response.render('my/login')
 })
 
 router.get('/drinks',async function(request,response){
    console.log("############ search page ")
    //query all drink
    const user = currentUser.get()
    const count = await Drinks.count({where:{username:user}})
    const drinks = await Drinks.findAll({where:{username:user}})
    const categorys = await Categorys.findAll({where:{username:user}})
    console.log("############my search count : " + count)
    console.log("############my search : " + JSON.stringify(drinks, null, 4))
    response.render('my/index',{count,drinks,categorys})
 }).post('/drinks',urlencodedParser,async function(request,response){
    console.log("############ add drink ")
    const {category,drinkname,imageUrl,comment} = request.body;
    console.log("############ add drink  : " + category)
    //add drink
    const user = currentUser.get()
    await Drinks.create({username:user,drinkname:drinkname,imageUrl:imageUrl,comment:comment,category:category})
    response.redirect(`/beverages/drinks`) 
 })

 router.post('/drinks/search',urlencodedParser,async function(request,response){
    console.log("############ search drink ")
    const { q } = request.body
    console.log("############search : " + q)
   //query all drink
   if(q != ""){
      const user = currentUser.get()
      const count = await Drinks.count({where:{username:user}})
      const drinks = await Drinks.findAll({where:{username:user,drinkname:q}})
      const categorys = await Categorys.findAll({where:{username:user}})
      console.log("############my search count : " + count)
      console.log("############my search : " + JSON.stringify(drinks, null, 4))
      response.render('my/index',{count,drinks,categorys})
   }else{
      response.redirect(`/beverages/drinks`) 
   }
 })

 router.get('/categories/search/:id',async function(request,response){
   console.log("############ search categories ")
   const { id } = request.params
   console.log("############ categories: " + id )
   //query all categories
   if(id != ""){
      const user = currentUser.get()
      const count = await Drinks.count({where:{username:user}})
      const drinks = await Drinks.findAll({where:{username:user,category:id}})
      const categorys = await Categorys.findAll({where:{username:user}})
      console.log("############my search count : " + count)
      console.log("############my search : " + JSON.stringify(drinks, null, 4))
      response.render('my/index',{count,drinks,categorys})
   }else{
      response.redirect(`/beverages/drinks`) 
   }
})

 router.get('/drinks/new',async function(request,response){
    console.log("############ new drink ")
    const user = currentUser.get()
    const categorys = await Categorys.findAll({where:{username:user}})
    console.log("############my new drink : " + JSON.stringify(categorys, null, 4))
    response.render('my/newdrink',{categorys})
 })

 router.get('/drinks/:id',async function(request,response){
    const { id } = request.params
    console.log("############ edit drink : " + id )
    const user = currentUser.get()
    const drinks = await Drinks.findByPk(id)
    console.log("############my edit drink : " + JSON.stringify(drinks, null, 4))
    const categorys = await Categorys.findAll({where:{username:user}})
    response.render('my/editdrink',{drinks,categorys})
 })

 router.post('/drinks/:id/edit',urlencodedParser,async function(request,response){
    const { id } = request.params
    const { category,drinkname,imageUrl,comment } = request.body;
    //const { id } = request.params
    console.log("############ edit drink : " + drinkname + " id : " + id)
    const user = currentUser.get()
    await Drinks.update({username:user,drinkname:drinkname,imageUrl:imageUrl,comment:comment,category:category},{where:{id: id}})
    response.redirect(`/beverages/drinks`) 
 })

router.delete('/categories/:id',urlencodedParser,async function(request,response){
    const { id } = request.params
    console.log("############ delete categories : " + id)
    await Categorys.destroy({where: {id}})
    response.redirect(`/beverages/drinks`) 
 })

 router.delete('/drinks/:id',urlencodedParser,async function(request,response){
    const { id } = request.params
    console.log("############ delete categories : " + id)
    await Drinks.destroy({where: {id}})
    response.redirect(`/beverages/drinks`) 
 })

 
router.get('/categories/new',function(request,response){
    console.log("############ show new categories ")
    response.render('my/new')
 })

router.post('/categories',urlencodedParser,async function(request,response){
    const { name } = request.body
    const user = currentUser.get()
    console.log("############ add cetegories : " + name)
    await Categorys.create({category:name,username:user})
    response.redirect(`/beverages/drinks`) 
 })
 
 module.exports = router