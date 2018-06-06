/**
 * APP 常量配置
 * Created by 郑君婵 on 2018-06-06
 */

module.exports = {
  // 项目名称
  NAME: '源音塘',
  // v2接口服务器
  V2_SERVER: process.server ? 'https://api.yuanyintang.com/' : '/',
  // 上传文件服务器
  FILES_SERVER: process.server ? 'http://api.demo.com' : '/',
  // App版本
  VERSON: '2.3.0',
  // 来源，4：wap
  LOG_AT: 4,
  // 网站header信息
  TITLE: '源音塘——全新的二次元音乐社区',
  KEYWORDS: '源音塘|原创|二次元音乐|满汉女神|加入音乐人|Vocaloid|动漫游戏|古风|三次元|翻唱歌曲|二次元|音乐人|咕噜吧啦|幻音', 
  DESCRIPTION: '源音塘是全新的以二次元音乐为主的音乐社区。这里有让耳朵怀孕的丰富良曲、极富魅力的音乐人和偶尔破次元的音乐同好。每天,故事和音乐都在这里'
}
