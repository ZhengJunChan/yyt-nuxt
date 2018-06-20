import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [thirdLogin 第三方登录]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     * @return   {[type]}   [description]
     */
    thirdLogin(params) {
        return ApiUtil.get('/v2/api/member/connect/login', params);
    },
    /**
     * [getActityTime 获取活动起止时间]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getActityTime(activityId) {
        return ApiUtil.get(`/v2/api/activity/read/${activityId}`);
    },
    /**
     * [getPrizeWorks 获取专区获奖作品]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    getPrizeWorks(activityId) {
        return ApiUtil.get('/v2/api/activity/autumn/' + activityId);
    },
    /**
     * [vote 投票]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    vote(params, activityId) {
        params.alias = activityId;

        return ApiUtil.get('/v2/api/member.activity/newvote', params);
    },
    /**
     * [getMusicList 获取参赛作品]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    getMusicList(params, activityId) {
        params.alias = activityId;

        return ApiUtil.get('/v2/api/activity/musics', params);
    },
    /**
     * [getFrendlyLink 获取友情链接]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    getFrendlyLink(activityId) {
        return ApiUtil.get('/v2/api/activity/getLink/' + activityId);
    }
};
