<template>
  <div class="recommend" v-loading="loading">
    <div class="tab-container">
      <div class="songs-table">
        <el-table :data="tableData" stripe style="width: 100%" @row-dblclick="play">

          <el-table-column type="index" width="50"></el-table-column>

          <el-table-column width="100">
            <template slot-scope="scope">
              <div class="img-wrap">
                <!-- <img v-lazy="scope.row.imgUrl" alt=""> -->
                <p class="iconfont icon-play" @click="play(scope.row)"></p>
              </div>
            </template>

          </el-table-column>
          <el-table-column prop="songName" label="音乐标题" width=""></el-table-column>
          <el-table-column label="歌手" width="" prop="artistname">
          </el-table-column>
          <el-table-column prop="duration" label="时长" width="100"></el-table-column>
        </el-table>

      </div>
      <!-- <Pagination :total="total" :pageSize="pageSize" :nowPage="page" @changePage="handleCurrentChange" /> -->
    </div>
  </div>
</template>

<script>
import { songListAPI } from '@/utils/api'
import Pagination from '@/components/Pagination.vue'

export default {
  data() {
    return {
      tableData: [],
      songUrl: "",
      loading: true
    }
  },
  created() {
    this.onLoad()
  },
  computed: {
    musicQueue() {
      return this.$store.state.musicQueue
    }
  },
  methods: {
    onLoad() {
      songListAPI(1).then(res => {
        // console.log(res)
        let resultList = res.data.slice(0, 50)
        let songsList = []
        for (const item of resultList) {
          let duration = item.duration
          // console.log(duration)
          let min = parseInt(duration / 60).toString().padStart(2, '0')
          let second = parseInt((duration - min * 60)).toString().padStart(2, '0')
          duration = `${min}:${second}`
          let song = {
            id: item.sid,
            songName: item.sname,
            artistname: item.artistname,
            artistid: item.artistid,
            imgUrl: 1,
            duration,
            mp3Url: "http://music.163.com/song/media/outer/url?id=" + item.sid + ".mp3"
          }
          // console.log(song.mp3Url);
          songsList.push(song)
        }
        this.tableData = songsList
      }).then(() => {
        this.loading = false
      })
    },
    toArtist(id) {
      this.$router.push(`/artist?artistId=${id}`)
    },
    toAlbum(id) {
      this.$router.push(`/album?id=${id}`)
    },
    play(row) {
      let id = row.id
      this.songUrl = "http://music.163.com/song/media/outer/url?id=" + id + ".mp3"

      if (1) {
        let musicInfo = {
          imgUrl: 1,
          artistname: row.artistname,
          songName: row.songName,
          artistId: row.artistid,
          id: row.id,
          duration: row.duration
        }

        this.$store.commit("changeMusicUrl", this.songUrl)
        this.$store.commit("changeMusicInfo", musicInfo)
        this.$store.commit("changeMusicStatus", false)
        this.$store.commit("changeMusicQueue", musicInfo)
        console.log("后");
        let ids = []
        for (const item of this.musicQueue) {
          ids.push(item.id)
        }
        this.$store.commit("changeNowIndex", ids.indexOf(musicInfo.id))

      } else {
        this.$message({
          showClose: true,
          message: '对不起，歌曲暂时无法播放。',
          type: 'error'
        });
      }

    },
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}

.new-songs {
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
}

.new-songs>>>.el-loading-spinner {
  top: 50%;
}

.el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}

.el-table::before {
  opacity: 0;
}

.songs-table {
  width: 100%;
}

.img-wrap {
  width: 60px;
  height: 60px;
  position: relative;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.img-wrap p::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, .8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c0392b;
  font-size: 14px;
  cursor: pointer;
}
</style>