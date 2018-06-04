// import { BrowserUtil } from '@/utils'

// let audio = document.getElementById('audio')

// export default {
//   initPlayer (state) {
//     state.playing = {
//       // 歌曲
//       song: {
//         id: 0, // 歌曲id
//         title: '', // 歌曲名称
//         lyrics: '', // 歌词
//         pause: false, // 是否暂停
//         video_link: '', // 歌曲地址
//         song_id: 0 // 歌曲所在歌单
//       },
//       // 正在播放的列表
//       playList: []
//     }

//     audio.setAttribute('src', '')
//   },
//   /**
//    * [pause 暂停歌曲]
//    * @Author   郑君婵
//    * @DateTime 2017-10-14
//    */
//   pause (state) {
//     state.playing.song.pause = true

//     audio.pause()
//   },
//   /**
//    * [pause 播放歌曲]
//    * @Author   郑君婵
//    * @DateTime 2017-10-14
//    */
//   play (state) {
//     state.playing.song.pause = false
//     audio.play()
//   },
//   /**
//    * [updataMusicInfo 更新播放歌曲信息]
//    * @Author   郑君婵
//    * @DateTime 2017-10-14
//    */
//   updataMusicInfo (state, song) {
//     state.playing.song.pause = false
//     state.playing.song.id = song.id
//     state.playing.song.song_id = song.song_id
//     state.playing.song.video_link = song.video_info.link

//     audio.setAttribute('src', song.video_info.link)
//   },
//   updataPlayList (state, sheet) {
//     state.playList = sheet
//   },
//   /**
//    * [saveSong 保存歌曲]
//    * @Author   郑君婵
//    * @DateTime 2017-10-14
//    */
//   saveSong (state, song) {
//     state.playedSongs[song.id] = song
//   },
//   /**
//    * [saveSongSheet 保存歌单]
//    * @Author   郑君婵
//    * @DateTime 2017-10-14
//    */
//   saveSongSheet (state, songSheet) {
//     state.playedSongSheets[songSheet.id] = songSheet
//   }
// }

// init()

// function init () {
//   if (!BrowserUtil.isFormWeiXin()) {
//     return
//   }

//   audio.play()
//   audio.pause()

//   document.addEventListener('WeixinJSBridgeReady', resetPlayer, false)
//   document.addEventListener('YixinJSBridgeReady', resetPlayer, false)
// }

// function resetPlayer () {
//   document.removeEventListener('WeixinJSBridgeReady', resetPlayer)
//   document.removeEventListener('YixinJSBridgeReady', resetPlayer)
// }
