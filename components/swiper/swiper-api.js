/**
 * [轮播相关api]
 * @Author   郑君婵
 * @DateTime 2017-07-28
 */

import { ApiUtil } from '@/utils';

export default {
    /**
     * [addClickCount 添加banner点击次数]
     * @Author   郑君婵
     * @DateTime 2017-08-17
     */
    addClickCount(params) {
        return ApiUtil.get('/v2/api/com/onClicknum', params);
    }
};
