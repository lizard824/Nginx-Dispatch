<template>
<div class="app-container calendar-list-container">
  <div class="filter-container" style="padding-bottom: 10px">
    <el-button type="primary" @click="add">add</el-button>
    <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
    <el-button type="primary" @click="MultiEdit" icon="el-icon-edit">批量</el-button>
    <el-button type="primary" @click="MultiDelete" icon="el-icon-delete">批量</el-button>
    <!-- <el-upload style="float:right;padding-bottom:10px">
      <el-button type="primary">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件(文件格式遵循导出文件)</div>
    </el-upload> -->
  </div>

  <el-table :data="tableData" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="35">
    </el-table-column>
    <el-table-column label="域名">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.idc }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.idc }}</span>
      </template>
    </el-table-column>
    <el-table-column label="路径">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.idc }}</span>
      </template>
    </el-table-column>
    <el-table-column label="起始时间">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.idc }}</span>
      </template>
    </el-table-column>
    <el-table-column label="失效时间">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.idc }}</span>
      </template>
    </el-table-column>





    <el-table-column align="center" label="编辑">
      <template slot-scope="scope">

            <el-button type="primary" size="small" icon="el-icon-edit" @click="dialogEditVisible=true">edit</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete">delete</el-button>


      </template>
    </el-table-column>

  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
  <!-- //add -->
  <el-dialog title="add" :visible.sync="dialogNewVisible" width="550px">
    <el-form :model="ctemp" :rules="rules" ref="ctemp" label-width="100px">
          <el-from-item label="文件名" label-width="120px" prop="fileName">
              <el-input v-model="ctemp.fileName" auto-complete="off"></el-input>
          </el-from-item>
          <el-from-item label="路径" label-width="120px" prop="filePath">
              <el-input v-model="ctemp.filePath" auto-complete="off"></el-input>
          </el-from-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogNewVisible = false">取 消</el-button>
      <el-button type="primary" @click="create">确 定</el-button>
    </div>
  </el-dialog>
  <!-- //edit -->
  <el-dialog title="edit" :visible.sync="dialogEditVisible" width="550px">
    <el-form :model="temp" :rules="rules" ref="temp" label-width="100px">
      <el-form-item label="文件名" label-width="80px" prop="fileName">
          <el-input v-model="temp.fileName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="路径" label-width="80px" prop="filePath">
          <el-input v-model="temp.filePath" auto-complete="off"></el-input>
      </el-form-item>
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
import {
  getList,
  addItem,
  deleteItem,
  editItem,
  searchItem
} from '@/api/ssl'

export default {
  data() {
    let selectList = new Set()
    var checkEmpty = (rule, value, callback) => {
        console.log(value)
        if (!value) {
          return callback(new Error('输入不能为空'))
        }else{
          callback()
        }
      }
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pagesize: 20,

      },
      dialogNewVisible: false,
      dialogEditVisible: false,
      dialogSearchVisible: false,
      mutipleSelection: [],
      transferSelect: [],
      setList: selectList,
      temp: {
          fileName:null,
          filePath:null
      },
      ctemp: {
          fileName:null,
          filePath:null
      },
      listQuery: {
        page:1,
        pagesize:20
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
    changeRole(row) {
      console.log(row)
      if (row.role == 'Master') {
        this.$set(row, 'role', 'slave')
      } else {
        this.$set(row, 'role', 'Master')
      }
    },
    search() {

    },
    create(){

    },
    edit() {

    },
    MultiEdit() {

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
    },
    //temp value of multiple selection
     handleSelectionChange(val) {

       this.setList = val
       console.log(this.setList)
       this.temp = Object.assign({}, val[0])

       console.log(this.multipleSelection)
     }

  }
}
</script>
