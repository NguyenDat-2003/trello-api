/* eslint-disable no-console */
import express from 'express';
import exitHook from 'async-exit-hook';

import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';

const START_SERVER = () => {
    const app = express();

    app.use('/v1', APIs_V1);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(
            `2. Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
        );
    });

    //--- Thực hiện tác vụ cleanup trước khi dừng server
    exitHook(() => {
        CLOSE_DB();
    });
};

//---Chỉ khi kết nối đến database thành công thì mới Start Server Back-end lên
(async () => {
    try {
        await CONNECT_DB();
        console.log('1. Connected to MongoDB Atlas!');
        START_SERVER();
    } catch (error) {
        console.error(error);
        process.exit();
    }
})();
