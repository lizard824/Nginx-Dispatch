<template>
<div class="app-container calendar-list-container">
  <div class="filter-container" style="padding-bottom: 10px">
    <el-button type="primary" @click="add">add</el-button>
    <!-- <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button> -->
    <!-- <el-button type="primary" @click="MultiEdit" icon="el-icon-edit">批量</el-button> -->
    <!-- <el-button type="primary" @click="MultiDelete" icon="el-icon-delete">批量</el-button> -->
    <!-- <el-upload action="" style="float:right;padding-bottom:10px">
      <el-button type="primary">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件(文件格式遵循导出文件)</div>
    </el-upload> -->
  </div>

  <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="upstream">
            <span>{{scope.row.date}}</span>
          </el-form-item>
          <el-form-item label="LB算法">
            <span>{{scope.row.date}}</span>
          </el-form-item>
          <el-form-item label="权重">
            <span>{{scope.row.date}}</span>
          </el-form-item>
          <el-form-item label="MaxFailed">
              <span>{{scope.row.date}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <!-- <el-table-column type="selection" width="35">
    </el-table-column> -->
    <el-table-column label="域名" sortable>
      <template slot-scope="scope">
        <span v-show="!scope.row.edit"  style="margin-left: 10px">{{ scope.row.domain_name }}</span>
        <el-input v-model="scope.row.domain_name" v-show="scope.row.edit"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="地区" sortable>
      <template slot-scope="scope">
        <el-tag type="info">{{ scope.row.region }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="类型" sortable>
      <template slot-scope="scope">
        <span v-show="!scope.row.edit" style="margin-left: 10px">{{ scope.row.domain_type }}</span>
        <el-input v-model="scope.row.domain_type" v-show="scope.row.edit"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="线路1" sortable>
      <template slot-scope="scope">
        <span v-show="!scope.row.edit">{{scope.row.line1 | transfer }}</span>
        <el-select v-show="scope.row.edit" v-model="scope.row.line1"  placeholder="请选择" filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
        <el-button @click="dialogEditVisible=true" icon="el-icon-edit" size="mini"></el-button>
      </template>
    </el-table-column>
    <el-table-column label="线路2" sortable>
      <template slot-scope="scope">
        <span v-show="!scope.row.edit">{{scope.row.line2 | transfer}}</span>
        <el-select v-show="scope.row.edit" v-model="scope.row.line2"  placeholder="请选择" filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
        <el-button @click="dialogEditVisible=true" icon="el-icon-edit" size="mini"></el-button>
      </template>
    </el-table-column>
    <el-table-column label="线路3" sortable>
      <template slot-scope="scope">
        <span v-show="!scope.row.edit">{{scope.row.line3 | transfer }}</span>
        <el-select v-show="scope.row.edit" v-model="scope.row.line3"  placeholder="请选择" filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
        <el-button @click="dialogEditVisible=true" icon="el-icon-edit" size="mini"></el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" label="编辑">
      <template slot-scope="scope">
        <el-button :type="scope.row.edit?'success':'primary'" @click='submit(scope.row)' size="small" icon="el-icon-edit">{{scope.row.edit?'完成':'编辑'}}</el-button>
        <el-button  size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></el-button>
      </template>

    </el-table-column>

  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
  <!-- add -->
  <!-- <el-dialog title="add" :visible.sync="dialogNewVisible" width="550px">
    <el-form :model="ctemp" :rules="rules" ref="ctemp" label-width="100px">

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
    </div>
  </el-dialog> -->
  <!-- edit -->
  <el-dialog title="config" :visible.sync="dialogEditVisible" width="550px">
    <el-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
    </div>
  </el-dialog>
  <!-- search -->
  <!-- <el-dialog title="edit" :visible.sync="dialogSearchVisible" width="550px">
    <el-form :model="listQuery"  ref="listQuery" label-width="100px">

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
  searchItem,
  getLine
} from '@/api/domain'

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
      textarea:'',
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
        domain_name:null,
        region:null,
        domain_type:null,
        line1:null,
        line2:null,
        line3:null
      },
      ctemp: {
        domain_name:null,
        region:null,
        domain_type:null,
        line1:null,
        line2:null,
        line3:null
      },
      listQuery: {
        page:1,
        pagesize:20
      },

      options: []

    }
  },
  // mounted:function(){
  //   components:{
  //     quillEditor
  //   }
  // },
  created(){
      this.getList()
      this.getLine()
  },
  filters:{
    transfer: function(val){

      switch (val){
        case 1 :
        return '北京'
        break
        case 2:
        return '广州'
        break
        case 3:
        return '深圳'
        break
        case 4:
        return '将军澳'
        break
        case 5:
        return '荃湾'
        break
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response =>{
        console.log(response.data)
        var items = response.data
        this.list =  items.map(ele=>
          {this.$set(ele,'edit',false)
          return ele
        }
        )
        this.total = response.total
        this.listLoading = false
        console.log(this.list)
      }).catch((err)=>{
        console.log(err)
      })
    },
    getLine(){
      getLine().then(response =>{

        this.options = response.data
        console.log(this.options)
      })
    },
    add() {
      this.list.unshift({
        domain_name:'',
        region:'国内',
        domain_type:'',
        line1:'',
        line2:'',
        line3:'',
        edit: true
      })
    },
    submit(row){
      row.edit=!row.edit
      if(row.edit===false){
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
      }
    },
    //config
    onEditorChange(){

    },
    search() {
      searchItem(this.listQuery).then(response =>{
        this.list = response.data
        this.total = response.total[0].total
        this.listLoading = false
      }).catch(err=>{
        console.log(err)
      })
    },
    edit() {
      editItem(this.temp).then(response =>{
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
    // MultiEdit() {
    //
    // },
    MultiDelete() {
      this.multipleSelection = []
        this.setList.forEach((item, i) => {

          this.multipleSelection.push(item.idc_id);
      })
      deleteItem({domain_id:this.multipleSelection}).then(response => {
          console.log(response.data);
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000

          })
          this.getList()
        }).catch(err=>{

        })

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
          deleteItem({domain_id: [row.domain_id]}).then(response => {
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
  }
}
</script>
<style lang="scss" scoped>
.table-expand {
  font-size: 0;
}
.table-expand label{
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
