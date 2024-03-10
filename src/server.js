/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import exitHook from 'async-exit-hook'

import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()
  app.use(express.json())
  app.use(cors(corsOptions))

  app.use('/v1', APIs_V1)

  //--- Middleware Error Handling
  app.use(errorHandlingMiddleware)

  // --- Đây là môi trường Production
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`2. Production ${env.AUTHOR}, I am running at PORT ${process.env.PORT}`)
    })
  } else {
    // --- Đây là môi trường Dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`2. Local DEV ${env.AUTHOR}, I am running at ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`)
    })
  }

  //--- Thực hiện tác vụ cleanup trước khi dừng server
  exitHook(() => {
    CLOSE_DB()
  })
}

//---Chỉ khi kết nối đến database thành công thì mới Start Server Back-end lên
;(async () => {
  try {
    await CONNECT_DB()
    console.log('1. Connected to MongoDB Atlas!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit()
  }
})()
