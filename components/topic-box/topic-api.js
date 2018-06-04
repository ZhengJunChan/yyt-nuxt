import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [getDefaultImg 获取相关池塘默认背景图片]
     * @Author   郑君婵
     * @DateTime 2017-10-19
     */
    getDefaultImg(params) {
        return ApiUtil.get('/v2/api/com/picture', params);
    }
};
