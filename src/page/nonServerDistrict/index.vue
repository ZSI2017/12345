<style lang="scss">

.el-tabs .el-tabs__content {
    display: none;
}

.mainTable {
    .cell {
        text-align: center;
    }
}

.el-tabs__item {
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}

.el-table .cell,
.el-table th>.cell {
    padding: 0 7px;
}

.link_button {
    border: 0;
}

.link_button:hover {
    background-color: no;
}

</style>

<template>

<div class="section" v-loading.body.fullscreen.lock="fullscreenLoading" style="overflow:hidden">
    <my-table
       :tableData ="tableData"
    >
      <table-column
           headerName="快递公司名称"

           >
      </table-column>
    </my-table>
    <el-table class="mainTable" :data="tableData" style="width: 100%;margin-top:10px" max-height="500" empty-text="暂无数据" align="center" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="name" label="快递公司名称">
        </el-table-column>
        <el-table-column label="非服务地区">
            <template scope="scope">
                <el-button @click="handleClick" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="修改时间">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button @click="handleEdit" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- <check-server
      :visible="dialogCheckVisible"
      :gridData="gridData"
      @listenToCheck ="changeCheckVisible"
    ></check-server> -->

    <config-server
      :visible="dialogConfigVisible"
      :sourceData="result"
      :onlyRead='isCheckServer'
      @listenToConfig="changeConfigVisible"
      > </config-server>
</div>

</template>
<script>
  import configServer from "@/page/nonServerDistrict/configServer";
  import checkbox from "@/page/nonServerDistrict/checkbox";
  import checkboxGroup from "@/page/nonServerDistrict/checkboxGroup"
  import myTable from "@/page/nonServerDistrict/myTable";
  import tableColumn from "@/page/nonServerDistrict/tableColumn";

export default {
    name: 'nonServerDistrict',
    components: {
        configServer,
        checkbox,
        checkboxGroup,
        myTable,
    },
    data() {
        return {
            checkboxArr: ["A1", "B1", "C1"],
            checkedNames1: [],
            myCheckedNames: ["A1", "B1"],
            checkedNames: [],
            myChecked: true,
            myMessage: true,
            tableData: [],
            result: {},
            input: '',
            dialogCheckVisible: false,
            dialogConfigVisible: false,
            isCheckServer: false,
            fullscreenLoading: false,
        }
    },
    methods: {
      CheckAllChange(ev) {
           console.log("handleCheckAllChange");
           console.log(ev);
      },
        mockInput(val) {
                //  console.log("mockInput");
                //  console.log(arguments);
                this.myCheckedNames = arguments[0]
                console.log(this.myCheckedNames);
            },
            groupEvent(value) {
                console.log("____________event__________");
                console.log(value);
            },
            handleClick() {
                this.isCheckServer = true;
                // this.dialogCheckVisible= true;
                let url = "/rest/list7";
                var _this = this;
                _this.$http.get(url, (data) => {
                    _this.result = data.data.data;
                    _this.dialogConfigVisible = true;
                }, (error) => {
                    console.log("error");
                    console.log(error);
                });
            },
            handleEdit() {
                this.isCheckServer = false;
                let url = "/rest/list7";
                var _this = this;
                _this.$http.get(url, (data) => {
                    _this.result = data.data.data
                    _this.dialogConfigVisible = true;
                }, (error) => {
                    console.log("error");
                    console.log(error);
                });

            },
            changeCheckVisible(flag) {
                this.dialogCheckVisible = flag;
            },
            changeConfigVisible(flag) {
                this.dialogConfigVisible = flag;
            }
    },
    created() {
        let url = "/rest/list2";
        var _this = this;
        // _this.fullscreenLoading = true;
        _this.$http.get(url, (data) => {
            console.log("success");
            console.log(data);

            setTimeout(() => {
                _this.tableData = data.data.data;
            }, 0);
        }, (error) => {
            console.log("error");
            console.log(error);
        });
    }
};

</script>
