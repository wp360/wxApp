<template>
  <div>
    <el-table v-loading="loading" :data="playlist" stripe>
      <el-table-column type="index" width="50" />
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="copywriter" label="描述" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 确认删除的对话框 -->
    <!-- <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该歌单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import { fetchList } from '@/api/playlist'
import scroll from '@/utils/scroll'

export default {
  data() {
    return {
      playlist: [],
      count: 50,
      loading: false,
      // 删除歌单的对话框是否显示
      delDialogVisible: false,
      info: {}
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    scroll.start(this.getList)
  },
  methods: {
    getList() {
      this.loading = true
      fetchList({
        start: this.playlist.length,
        count: this.count
      }).then(res => {
        console.log(res)
        this.playlist = this.playlist.concat(res.data)
        if (res.data.length < this.count) {
          scroll.end()
        }
        this.loading = false
      })
    },
    onEdit(row) {
      this.$router.push(`/playlist/edit/${row._id}`)
    }
  }
}
</script>
