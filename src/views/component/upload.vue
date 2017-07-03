<template type="html">
<section>
  <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>

  <el-upload action="https://jsonplaceholder.typicode.com/posts/" style="padding-top:40px;" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</section>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style scoped type = "scss">

</style>
