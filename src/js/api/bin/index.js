#!/usr/bin/env node
if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({silent: true});
}

const Koa = require('koa')
const passport = require('passport')
const uhttp = require('http')
const Router = require('koa-router')
const ctk = require('koa-connect')
const morgan = require('morgan')
const applyMiddlewares = require('../core/middleware')
const setupRoutes = require('../core/routes')
const logger = require('../helpers/logger')
const {initAuth} = require('../auth')

const app = new Koa();
initAuth();
applyMiddlewares(app);
const router = setupRoutes(Router());

 app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(ctk(morgan('dev')))
  .use(passport.initialize())
  .use(passport.session());

uhttp
  .createServer(app.callback())
  .listen(process.env.SERVER_PORT, () => {
    logger.info(`Koa server listening on port ${process.env.SERVER_PORT}`);
  });
