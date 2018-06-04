export default {
  // 正在播放的歌曲
  playing: {
    // 歌曲
    song: {
      id: 0, // 歌曲id
      title: '', // 歌曲名称
      lyrics: '', // 歌词
      pause: false, // 是否暂停
      video_link: '', // 歌曲地址
      song_id: 0 // 歌曲所在歌单
    },
    // 歌手
    singer: {
      uid: 0,
      head: '',
      nickname: ''
    }
  },
  // 正在播放的列表
  playList: [],
  // 已播放过的所有歌曲
  playedSongs: {},
  // 已播放过的所有歌单
  playedSongSheets: {}
}
