<template>
  <div class="templateCont">
    <div class="public_template custom_input">
      <el-input v-model="submitQuery.title" placeholder="请输入文章标题"></el-input>
      <el-button type="primary" @click="submit">发布</el-button>
    </div>
    <div class="public_template">
      <p>请选择分类</p>
      <div class="category">
        <p
          @click="selectCategory(item.id)"
          v-for="(item,index) in category"
          :key="index"
          :class="submitQuery.categoryId==item.id?'active':''"
        >{{item.categoryName}}</p>
      </div>
      <p style="margin-top:20px">请选择标签</p>
      <div class="subclass">
        <p
          @click="selectSubclass(item.id)"
          v-for="(item,index) in subclass"
          :key="index"
          :class="submitQuery.subclassId==item.id?'active':''"
        >{{item.subclassName}}</p>
        <el-button @click="addSubclass" class="add_subclass" type="text" icon="el-icon-plus">添加新标签</el-button>
      </div>
      <p style="margin:20px 0">上传封面</p>
      <el-upload
        class="avatar-uploaders"
        :action="serverUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="submitQuery.src" :src="submitQuery.src" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <quillEditor class="editor" :text="submitQuery.content" @input="editorCont" />
  </div>
</template>

<script>
import quillEditor from '@/components/quilleditor'
import { getCategory, addSubclass, addArtcle } from '@/api/article'
import { parseTime } from '@/utils/date'
import baseUrl from '../../../baseUrl'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 提交请求参数
      submitQuery: {
        title: '',
        content: '',
        categoryId: '',
        subclassId: null,
        src: null,
        author: JSON.parse(sessionStorage.getItem('userInfo')).userName,
        createDate: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}')
      },
      // serverUrl: `${baseUrl}article/upload`,
      serverUrl: `http://118.24.125.76/api/article/upload`,
      // 一级分类列表
      category: [],
      // 二级分类列表
      subclass: []
    }
  },
  async mounted () {
    this.category = await this.categoryList({ type: 0 })
    this.submitQuery.categoryId = this.category[0].id
    this.getSubclass()
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.submitQuery.src = `http://118.24.125.76:3000/${res.data}`
      // if (process.env.NODE_ENV === 'production') {
      //   this.submitQuery.src = `http://118.24.125.76:3000/${res.data}`
      // } else {
      //   this.submitQuery.src = `http://localhost:3000/${res.data}`
      // }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submit () {
      if (!this.submitQuery.title) {
        return this.message('请输入文章标题', 'warning')
      } else if (!this.submitQuery.content) {
        return this.message('请输入文章内容', 'warning')
      }
      addArtcle(this.submitQuery).then(res => {
        if (res.code !== 200) return this.message(res.msg, 'warning')
        this.message(res.msg, 'success')
        this.$router.push({
          path: '/article'
        })
      })
    },
    message (message, type = null) {
      this.$message({
        type: type,
        message: message
      })
    },
    async getSubclass () {
      this.subclass = await this.categoryList({
        type: 1,
        categoryId: this.submitQuery.categoryId
      })
      if (this.subclass[0]) {
        this.submitQuery.subclassId = this.subclass[0].id
      } else {
        this.submitQuery.subclassId = null
      }
    },
    // 获取分类列表  type 0 一级 1 二级
    categoryList (data) {
      return new Promise((resolve, reject) => {
        getCategory(data).then(res => {
          resolve(res.data)
        })
      })
    },
    selectCategory (e) {
      this.submitQuery.categoryId = e
      this.getSubclass()
    },
    selectSubclass (e) {
      this.submitQuery.subclassId = e
    },
    addSubclass () {
      this.$prompt('请输入标签', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          let query = {
            categoryId: this.submitQuery.categoryId,
            subclassName: value
          }
          addSubclass(query).then(res => {
            if (res.code !== 200) return this.message(res.msg, 'warning')
            this.getSubclass()
          })
        })
        .catch(() => {})
    },
    editorCont (e) {
      this.submitQuery.content = e
      // console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploaders /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploaders .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.templateCont {
  background: #fff;
  height: 100%;
  padding: 20px 200px;
  p {
    font-size: #2e3135;
  }
}
.editor {
  height: 700px;
  margin-bottom: 20px;
}
.public_template {
  margin-bottom: 20px;
}
@mixin public_p($h, $fz) {
  height: $h;
  line-height: $h;
  font-size: $fz;
  padding: 0 12px;
  display: inline-block;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
}
.category {
  margin-top: 10px;
  p {
    @include public_p(40px, 15px);
    &.active {
      background: #007fff;
      color: #fff;
      border: 0;
    }
  }
}
.subclass {
  margin-top: 10px;
  p {
    @include public_p(36px, 14px);
    &.active {
      border-color: #007fff;
      color: #007fff;
    }
  }
  .add_subclass {
    float: right;
  }
}
.custom_input {
  display: flex;
}
.custom_input .el-input /deep/ input {
  border: 0 !important;
  border-bottom: 1px solid #dcdfe6 !important;
  padding-left: 0;
}
</style>
