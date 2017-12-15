<template>
  <div class="app-container calendar-list-container">
  <div class="filter-container" style="padding-bottom: 10px">
    <el-button type="primary" @click="add">add</el-button>
    <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
    <el-button type="primary" @click="MultiEdit" icon="el-icon-edit">批量</el-button>
    <el-button type="primary" @click="MultiDelete" icon="el-icon-delete">批量</el-button>
     <!-- <el-button type="primary" icon="el-icon-upload" >上传</el-button> -->
     <el-upload style="float:right;padding-bottom:10px">
            <el-button type="primary">上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件(文件格式遵循导出文件)</div>
    </el-upload>
  </div>

  <el-table :data="tableData" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column
       type="selection"
       width="35">
     </el-table-column>
    <el-table-column label="idc" sortable>
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.idc }}</span>
      </template>
    </el-table-column>

    <el-table-column label="vip" sortable>
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>ip1: {{ scope.row.ip1 }}</p>
          <p>ip2: {{ scope.row.ip2 }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.vip }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="ip1" sortable>
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>vip: {{ scope.row.vip }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag type="success">{{ scope.row.ip1 }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="ip2" sortable>
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>vip: {{ scope.row.vip }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag type="success">{{ scope.row.ip2 }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>


    <el-table-column label="role" >

      <template slot-scope="scope">
        <!-- <span style="margin-left: 10px">{{ scope.row.role }}</span>
        <span style="margin-left: 10px">{{ scope.row.role }}</span> -->
            <el-button :type="scope.row.role=='Master'?'primary':'info'" @click='changeRole(scope.row)'>{{scope.row.role}}</el-button>
      </template>
    </el-table-column>

    <el-table-column align="center" label="编辑">
      <template slot-scope="scope">
        <svg-icon class="nginx" icon-class="edit" ></svg-icon>
        <svg-icon class="nginx"icon-class="check" ></svg-icon>
        <svg-icon class="nginx"icon-class="restart" ></svg-icon>
        <svg-icon class="nginx"icon-class="close" ></svg-icon>
        <svg-icon class="nginx"icon-class="connect" ></svg-icon>
        <svg-icon class="nginx"icon-class="request" ></svg-icon>
        <svg-icon class="nginx"icon-class="toggle" @click.native="changeRole(scope.row)" style="cursor:pointer;margin-left:5px"></svg-icon>
      </template>
    </el-table-column>

  </el-table>
  <div v-show="true" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                   :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
  <!-- //add -->
  <el-dialog title="add" :visible.sync="dialogNewVisible" width="550px">
    <el-form :model="ctemp" :rules="rules" ref="ctemp" label-width="100px">

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
    </div>
  </el-dialog>
  <!-- //edit -->
  <el-dialog title="edit" :visible.sync="dialogEditVisible" width="550px">
    <el-form :model="temp" :rules="rules" ref="temp" label-width="100px">

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
    </div>
  </el-dialog>
  <!-- //search -->
  <el-dialog title="edit" :visible.sync="dialogSearchVisible" width="550px">
    <el-form :model="listQuery" :rules="rules" ref="listQuery" label-width="100px">

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSearchVisible = false">取 消</el-button>
        <el-button type="primary" @click="search">确 定</el-button>
    </div>
  </el-dialog>
    </div>
</template>

<script>
import {getList,addItem,deleteItem,editItem,searchItem} from '@/api/nginx'

export default {
  data() {

      let selectList = new Set()
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page:1,
          pagesize: 20,

        },
        dialogNewVisible: false,
        dialogEditVisible: false,
        dialogSearchVisible: false,
        mutipleSelection: [],
        transferSelect: [],
        setList:selectList,
        temp:{

        },
        ctemp:{

        },
        listQuery:{

        },
      tableData: [{
        idc: '世纪互联',
        vip: '172.111.111.11',
        ip1: '172.111.111.1',
        ip2: '172.111.111.2',
        role: 'Master',

      }, {
        idc: '世纪互联',
        vip: '172.111.111.11',
        ip1: '172.111.111.1',
        ip2: '172.111.111.2',
        role: 'Master',
      }, {
        idc: '世纪互联',
        vip: '172.111.111.11',
        ip1: '172.111.111.1',
        ip2: '172.111.111.2',
        role: 'Master',
      }, {
        idc: '世纪互联',
        vip: '172.111.111.11',
        ip1: '172.111.111.1',
        ip2: '172.111.111.2',
        role: 'Master',
      }]

    }
  },
  methods: {
   getList() {
        this.listLoading = true
   },
    add() {
        this.tableData.unshift({data:"",name:"",city1:"",city2:"",city3:"",address:"",edit:true})
    },
    changeRole(row){
      console.log(row)
      if(row.role=='Master'){
        this.$set(row,'role','slave')
            }else{
        this.$set(row,'role','Master')
      }
    },
    search(){

    },
    edit() {

    },
    MultiEdit(){

    },
    MultiDelete() {

    },
    handleSizeChange(val) {
      this.listQuery.pagesize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
<style scoped>
  .nginx {
    cursor: pointer;
    margin-left:5px;
  }
</style>
