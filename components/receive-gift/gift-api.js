import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [receiveGifts 音乐人收到的礼物列表]
     * @Author   郑君婵
     * @DateTime 2018-05-18
     */
    receiveGiftsForSinger(params) {
        return ApiUtil.get(`/v2/api/member/get_gift`, params);
    },
    /**
     * [receiveGifts 音乐详情中音乐人收到的礼物列表]
     * @Author   郑君婵
     * @DateTime 2018-05-18
     */
    receiveGiftForMusic(params) {
        return ApiUtil.get(`/v2/api/music/get_gift`, params);
    }
};
