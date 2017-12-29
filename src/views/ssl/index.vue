<template>
<div class="app-container calendar-list-container">
  <div class="filter-container" style="padding-bottom: 10px">
    <!-- <el-button type="primary" @click="dialogNewVisible=true">add</el-button> -->
    <!-- <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button> -->
    <!-- <el-button type="primary" @click="MultiEdit" icon="el-icon-edit">批量</el-button> -->
    <!-- <el-button type="primary" @click="MultiDelete" icon="el-icon-delete">批量</el-button> -->
    <el-upload action="http://172.28.48.61:4000/ssl/update"    :show-file-list="false" :on-error="uploadError" :on-success="uploadSuccess" style="float:right;padding-bottom:10px">
      <el-button  type="primary">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传ssl文件</div>
    </el-upload>
  </div>

  <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
    <!-- <el-table-column type="selection" width="35">
    </el-table-column> -->
    <el-table-column label="域名">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.domainname }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.filename}}</span>
      </template>
    </el-table-column>
    <el-table-column label="路径">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.filepath }}</span>
      </template>
    </el-table-column>
    <el-table-column label="起始时间">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="失效时间">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="失效时间">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.Invalid_time }}</span>
      </template>
    </el-table-column>




    <el-table-column align="center" label="编辑">
      <template slot-scope="scope">

            <!-- <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">edit</el-button> -->
            <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></el-button>


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
          <el-form-item label="文件名" label-width="120px" prop="filename">
              <el-input v-model="ctemp.filename" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="路径" label-width="120px" prop="filepath">
              <el-input v-model="ctemp.filepath" auto-complete="off"></el-input>
          </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogNewVisible = false">取 消</el-button>
      <el-button type="primary" @click="create">确 定</el-button>
    </div>
  </el-dialog>
  <!-- //edit -->
  <el-dialog title="edit" :visible.sync="dialogEditVisible" width="550px">
    <el-form :model="temp" :rules="rules" ref="temp" label-width="100px">
      <el-form-item label="文件名" label-width="80px" prop="filename">
          <el-input v-model="temp.filename" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="路径" label-width="80px" prop="filepath">
          <el-input v-model="temp.filepath" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogEditVisible = false">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </div>
  </el-dialog>
  <!-- //search -->
  <!-- <el-dialog title="edit" :visible.sync="dialogSearchVisible" width="550px">
    <el-form :model="listQuery" :rules="rules" ref="listQuery" label-width="100px">

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogSearchVisible = false">取 消</el-button>
      <el-button type="primary" @click="search">确 定</el-button>
    </div>
  </el-dialog> -->
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
          id:null,
          fileName:null,
          filePath:null,
          invalid_time:null,
          end_time:null,
          start_time:null
      },
      ctemp: {
        id:null,
        fileName:null,
        filePath:null,
        invalid_time:null,
        end_time:null,
        start_time:null
      },
      listQuery: {
        page:1,
        pagesize:20
      },
      rules:{
        filename:[{validator: checkEmpty, trigger:'blur'}],
        filepath:[{validator: checkEmpty, trigger:'blur'}]
      }

    }
  },
  created(){
     this.getList()

  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response=>{
        console.log(response)
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(error=>{
          console.log(error)
      })

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
        addItem(this.ctemp).then(response=>{
          if(response.code=='20000'){
            this.$notify({
              title: '成功',
                message: response.msg,
                type: 'success',
                duration: 5000
            })
          }
          else{
            this.$notify({
                title: '失败',
                message: response.msg,
                type: 'warning',
                duration: 5000
              })
          }
        }).catch()
    },
    edit() {
        editItem(this.temp).then(response=>{
          if(response.code=='20000'){
            this.$notify({
              title: '成功',
                message: response.msg,
                type: 'success',
                duration: 5000
            })
          }
          else{
            this.$notify({
                title: '失败',
                message: response.msg,
                type: 'warning',
                duration: 5000
              })
          }
        })
    },
    MultiEdit() {

    },
    MultiDelete() {

    },
    handleEdit(index,row){
      this.dialogEditVisible=true
      this.temp= Object.assign({},row)
      console.log(this.temp)
    },
    handleDelete(index,row){
      const h = this.$createElement;
       this.$msgbox({
         title: '删除',
         message: h('p', null, [
           h('span', null, '删除此条记录？'),
           h('i', { style: 'color: red' })
         ]),
         showCancelButton: true,
         confirmButtonText: '确定',
         cancelButtonText: '取消',

       }).then(action => {
         deleteItem({id: [row.id]}).then(response => {
           console.log(response.data);
           if(response.data.code=='20000'){
             this.$notify({
               title: '成功',
               message: response.data.msg,
               type: 'success',
               duration: 5000
             })
           }else{
             this.$notify({
               title: '失败',
               message: response.data.msg,
               type: 'warning',
               duration: 5000
             })
           }
           const index = this.list.indexOf(row)
           this.list.splice(index, 1)
         }).catch(error => {
         })
       });
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
     },
     uploadError(){
      this.$notify({
        title: '失败',
        message: '上传失败',
        type: 'warning',
        duration: 5000

      })
    },
    //上传成功后判断 是否录入
    uploadSuccess(response,file,fileList) {

      console.log(response)
      if (response.code == '50000') {
        this.$notify({
          title: '失败',
          message: response.msg,
          type: 'warning',
          duration: 5000

        })
      }
      else {
        this.$notify({
          title: '成功',
          message: response.msg,
          type: 'success',
          duration: 5000

        })
        this.getList()

      }
    }

  }
}
</script>
