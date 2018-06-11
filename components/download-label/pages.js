//注：yytType为页面打开类型，url为需要打开页面地址，id为歌曲、池塘、音乐人等的id
//    yytType为page时，url为约定字段
//    yytType为activity时，url为完整网址
export default {
	// 首页*
    home: {
        yytType: 'page',
        url: 'home' 
    },
    // 音乐详情*
    musicDetails: {
        yytType: 'page',
        url: 'musicDetails',
        id: 111
    },
    // 歌单详情*
    songSheetDetails: {
        yytType: 'page',
        url: 'songSheetDetails',
        id: 111
    },
    // 音乐人详情-主页**
    musicianDetailHome: {
        yytType: 'page',
        url: 'musicianDetailHome',
        id: 111
    },
    // 音乐人详情-音乐*
    musicianDetailHome: {
        yytType: 'page',
        url: 'musicianDetailMusic',
        id: 111
    },
    // 音乐人详情-歌单*
    musicianDetailHome: {
        yytType: 'page',
        url: 'musicianDetailSongSheet',
        id: 111
    },
    // 音乐人详情-池塘*
    musicianDetailHome: {
        yytType: 'page',
        url: 'musicianDetailTopic',
        id: 111
    },
    // ta喜欢的歌单详情*
    likesSongSheetDetails: {
        yytType: 'page',
        url: 'likesSongSheetDetails',
        id: 111
    },
    // 池塘详情
    musicDetails: {
        yytType: 'page',
        url: 'topicDetails',
        id: 111
    },
    // 榜单页
    top: {
        yytType: 'page',
        url: 'top',
        billboard_type: '1', // 排行榜分类的ID，1 甜甜圈榜，2音乐榜
        date: '1', // 1 日，2 周，3月
        class: '1', // 请求列表的id
        toggle_id: '1' // 收益榜、贡献榜相互切换时，非当前榜单的classid
    },
    // 榜单分类页
    topTypes: {
        yytType: 'page',
        url: 'topTypes'
    }
};
