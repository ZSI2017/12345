<template type="html">
<section >
   <p style="color:#00b7f9;cursor:pointer" @click="$router.go(-1)"  >&lt; 返回</p>
  <el-form ref="form" :model="form" label-width="80px" label-position="left" style="width:800px;padding-left:100px">
    <el-form-item label="名称">
      <el-input v-model="form.name" placeholder="请输入运营图名称"> </el-input>
    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-model="form.name" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <el-form-item label="链接">
      <el-input v-model="form.name" placeholder="请输入需要跳转的链接，如果调"> </el-input>
    </el-form-item>
    <el-form-item label="有效时段">
        <el-date-picker v-model="value3" type="datetimerange" placeholder="选择时间范围">
        </el-date-picker>
     </el-form-item>
    <el-col class="line" :span="2">-</el-col>
  </el-form>
</section>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
<style type="scss">
    section {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
        border:1px solid #D3DCE6;
        border-radius: 4px;
        padding:20px;
        background-color: white;

    }

</style>
