/**
 * [轮播相关api]
 * @Author   郑君婵
 * @DateTime 2017-07-28
 */

import { ApiUtil } from '@/utils';

export default {
    /**
     * [getTopType 获取排行榜类型]
     * @Author   郑君婵
     * @DateTime 2018-05-11
     */
    getTopType() {
        return ApiUtil.get('/v2/api/billboard/getclass');
    },
    /**
     * [addClickCount 添加banner点击次数]
     * @Author   郑君婵
     * @DateTime 2017-08-17
     */
    getTopList(params) {
        return ApiUtil.get('/v2/api/billboard/getlist', params);
        // return ApiUtil.get('/v2/api/billboard/getlist', params);
    }
};
