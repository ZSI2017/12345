<template>
   <section class="section sendExpress">
    <!-- <div class="sendExpress">
      <el-steps :space="200" :active="step" class="step">
        <el-step title="活动信息" description=""></el-step>
        <el-step title="报名签到" description=""></el-step>
        <el-step title="分享设置" description=""></el-step>
        <el-step title="个性设置" description=""></el-step>
      </el-steps>

      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>

        <div class="but-group">
          <el-button @click.native.prevent="handlePreview" v-show="preview">预览</el-button>
          <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
          <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
          <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary">发布活动</el-button>
        </div>
    </div> -->
    <!--  标签页导航  -->
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="配置" name="first">配置</el-tab-pane>
        <el-tab-pane label="已上线" name="second">已上线</el-tab-pane>
    </el-tabs>
    <!--  单选框   -->
    <el-row :span="24" type="flex" align="middle" v-if="">
        <el-col :span="8">
            <el-radio-group v-model="radio2">
                  <el-radio :label="3">审核通过</el-radio>
                  <el-radio :label="6">驳回</el-radio>
                  <el-radio :label="9">待审核</el-radio>
                  <el-radio :label="12">草稿</el-radio>
             </el-radio-group>
        </el-col>
        <el-col :span="14" style="height:20px"></el-col>
       <el-col :span="2">
          <el-button type="primary" @click="setNewData" size="large">+添加</el-button>
       </el-col>
    </el-row>
    <!--  下面的表格   -->
    <el-table :data="tableData" v-loading.fullscreen.lock="listLoading" style="width: 100%" max-height="550" empty-text="_" align="center" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="operationsMapName" label="运营图名称" sortable min-width="120">
      </el-table-column>
      <el-table-column prop="name" label="运营图" sortable min-width="100">
        <template scope="scope">
              <img width="50px" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png">
          </template>
      </el-table-column>
      <el-table-column prop="link" min-width="200" label="链接">
      </el-table-column>
      <el-table-column prop="address" label="覆盖地区">
         <template scope="scope">
            <el-button @click="checkArea" type="text" size="small">查看</el-button>
         </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间">
      </el-table-column>
      <el-table-column prop="activeTime" min-width="200" label="有效时段">
      </el-table-column>
      <el-table-column prop="Forder" label="排序值">
      </el-table-column>
      <el-table-column prop="currentState" label="当前状态">

      </el-table-column>
      <el-table-column prop="auditState" label="审核状态">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
             <el-button @click="handleClick" type="text" size="small">查看</el-button>
             <el-button @click="handleEdit" type="text" size="small">编辑</el-button>
           </template>
      </el-table-column>
    </el-table>

  </section>
</template>

  <script type="text/javascript">
  export default {
      data() {
        return {
          tableData:[],
          listLoading:false,
          radio2:3,
          activeName2: 'first'
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
      created() {
        var _this = this;
        _this.$http.get("/rest/list2")
          .then(function(rsp) {
            _this.tableData = rsp.data.data
          })
          .catch(function(error) {
            console.log(error);
          })

        console.log(this.$route.matched);
      },
  }
    // import store from 'src/store.js'
    // import $ from 'jquery'
    //
    // export default {
    // name:'sendExpress',
    // data: function () {
    //   return {
    //     isRouter: false,
    //     preview: true,
    //     preStep: false,
    //     nextStep: true,
    //     publish: false,
    //     step: 1
    //   }
    // },
    // methods: {
    //   handlePreview: function () {
    //     console.log('预览');
    //   },
    //   handlePreStep: function () {
    //         this.$router.go(-1);
    //         this.step--;
    //         this.goStep(this.step);
    //       $('html,body').animate({scrollTop:0},500);
    //   },
    //   handleNextStep: function () {
    //       this.$router.push('/sendExpress/step'+(this.step+1));
    //       var _this = this;
    //       setTimeout(function () {
    //           if(_this.isRouter){
    //               _this.step++;
    //               _this.goStep(_this.step);
    //           }
    //       })
    //     $('html,body').animate({scrollTop:0},500);
    //
    //   },
    //   handlePublish: function () {
    //     console.log('发布');
    //   },
    //   goStep: function (n) {
    //     switch (n) {
    //       case 1 :
    //         this.preview = true;this.preStep = false;this.nextStep = true;this.publish = false;
    //         break;
    //       case 2 :
    //         this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
    //         break;
    //       case 3 :
    //         this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
    //         break;
    //       case 4 :
    //         this.preview = false;this.preStep = true;this.nextStep = false;this.publish = true;
    //         break;
    //     }
    //   }
    // },
    // watch:{
    //     '$route': function (to,from) {
    //         this.isRouter = true;
    //     }
    // }
  // }

</script>
<style lang="scss">

 /*.sendExpress .router-link{color:#fff;}
 .sendExpress .but-group .el-button{margin-right: 20px;}*/
 .sendExpress {
     .el-tabs .el-tabs__content {
         display:none;
     }
 }
</style>
