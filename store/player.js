import { PlayerApi } from '@/api'

let audio = null

if (process.browser) {
  audio = document.getElementById('audio')
}

export const state = () => ({
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
})

export const mutations = {
  /**
   * [pause 暂停歌曲]
   * @Author   郑君婵
   * @DateTime 2017-10-14
   */
  pause (state) {
    state.playing.song.pause = true

    audio.pause()
  },
  /**
   * [pause 播放歌曲]
   * @Author   郑君婵
   * @DateTime 2017-10-14
   */
  play (state) {
    state.playing.song.pause = false
    audio.play()
  },
  /**
   * [updataMusicInfo 更新播放歌曲信息]
   * @Author   郑君婵
   * @DateTime 2017-10-14
   */
  updataMusicInfo (state, song) {
    state.playing.song.pause = false
    state.playing.song.id = song.id
    state.playing.song.song_id = song.song_id
    state.playing.song.video_link = song.video_info.link
    console.log(audio)

    audio.setAttribute('src', song.video_info.link)
  },
  updataPlayList (state, sheet) {
    state.playList = sheet
  },
  /**
   * [saveSong 保存歌曲]
   * @Author   郑君婵
   * @DateTime 2017-10-14
   */
  saveSong (state, song) {
    state.playedSongs[song.id] = song
  },
  /**
   * [saveSongSheet 保存歌单]
   * @Author   郑君婵
   * @DateTime 2017-10-14
   */
  saveSongSheet (state, songSheet) {
    state.playedSongSheets[songSheet.id] = songSheet
  }
}

export const actions = {
  /**
   * [playSong 播放歌曲]
   * @Author   郑君婵
   * @DateTime 2017-10-14
   * @param    {[type]}   options.dispatch [description]
   * @param    {[type]}   options.commit   [description]
   * @param    {[Object]}   params         [params.songId: 歌曲id；params.songSheetId: 所在歌单id]
   * @return   {[type]}                    [description]
   */
  playSong ({ dispatch, commit, state }, {music, addPlayCount}) {
    let sheet = []

    if (!music.id && music.music_id) {
      music.id = music.music_id
    }

    // 如果该歌曲是正在播放的歌曲
    if (state.playing.song.id === music.id) {
      if (state.playing.song.pause) {
        commit('play')
      } else {
        commit('pause')
      }

      return
    }

    sheet.push(music)
    dispatch('updataSongSheet', { sheetId: 0, songList: sheet, addPlayCount })

    // 保存歌曲信息
    commit('saveSong', music)
  },
  playSongSheet ({ dispatch, commit, state }, {songSheet, addPlayCount}) {
    // 如果该歌曲是正在播放的歌曲
    if (state.playing.song.song_id === songSheet.id) {
      if (state.playing.song.pause) {
        commit('play')
      } else {
        commit('pause')
      }

      return
    }

    dispatch('updataSongSheet', { sheetId: songSheet.id, songList: songSheet.music, addPlayCount })
    commit('saveSongSheet', songSheet.music)
  },
  updataSongSheet ({ dispatch, commit, state }, {sheetId, songList, addPlayCount}) {
    dispatch('addPlayCount', {
      sheetId,
      callBack: addPlayCount,
      musicId: songList[0].id
    })

    commit('updataMusicInfo', songList[0])
    commit('play')
    commit('updataPlayList', songList)
  },
  addPlayCount ({ state }, { musicId, sheetId, callBack }) {
    let params = {
      music_id: musicId,
      song_id: sheetId
    }

    PlayerApi.addPlayCount(params).then(res => {
      if (res.code === 1) {
        callBack && callBack()
      }
    })
  }
}
