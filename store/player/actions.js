import PlayerApi from './player-api.js'

export default {
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
