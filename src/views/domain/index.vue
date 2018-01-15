<template>
<div class="app-container calendar-list-container">
  <div class="filter-container" style="padding-bottom: 10px">
    <el-button type="primary" @click="add">add</el-button>
    <el-button type="primary" @click="remove">撤销</el-button>
    <!-- <el-button type="primary" @click="MultiEdit" icon="el-icon-edit">批量</el-button> -->
    <!-- <el-button type="primary" @click="MultiDelete" icon="el-icon-delete">批量</el-button> -->
    <!-- <el-upload action="" style="float:right;padding-bottom:10px">
      <el-button type="primary">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件(文件格式遵循导出文件)</div>
    </el-upload> -->
  </div>

  <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="table-expand"　label-width="220px">
          <el-form-item label="upstreams">
            <span v-show="!scope.row.edit">{{scope.row.upstreams}}</span>
            <el-input v-model.trim="scope.row.upstreams" v-show="scope.row.edit"></el-input>
            <el-button type="primary" icon="el-icon-circle-check" @click="getSn(scope.row)" v-show="scope.row.edit" size="mini"></el-button>
          </el-form-item>
          <el-form-item label="LB算法">
            <span v-show="!scope.row.edit">{{scope.row.function}}</span>
            <el-input v-model="scope.row.function" v-show="scope.row.edit"></el-input>
          </el-form-item>
          <el-form-item label="权重">
            <span v-show="!scope.row.edit">{{scope.row.weight}}</span>
            <el-input v-model="scope.row.weight" v-show="scope.row.edit"></el-input>
          </el-form-item>
          <el-form-item label="MaxFailed">
            <span v-show="!scope.row.edit">{{scope.row.max_fails}}</span>
            <el-input v-model="scope.row.max_fails" v-show="scope.row.edit"></el-input>
          </el-form-item>
          <el-form-item label="FailTimeout">
            <span v-show="!scope.row.edit">{{scope.row.fail_timeout}}</span>
            <el-input v-model="scope.row.fail_timeout" v-show="scope.row.edit"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <!-- <el-table-column type="selection" width="35">
    </el-table-column> -->
    <el-table-column label="域名" sortable>
      <template slot-scope="scope">
        <span v-show="!scope.row.edit" style="margin-left: 10px">{{ scope.row.domain_name }}</span>
        <el-input v-model="scope.row.domain_name" v-show="scope.row.edit" :disabled="scope.row.domain_id!=null"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="地区" sortable>
      <template slot-scope="scope">
        <el-tag v-show="!scope.row.edit" type="info">{{ scope.row.region }}</el-tag>
        <el-select v-show="scope.row.edit" v-model="scope.row.region"  placeholder="请选择" filterable >
          <el-option v-for="item in region" :key="item.value"  :value="item.value" >
          </el-option>
    </el-select>
      </template>
    </el-table-column>
    <el-table-column label="类型" sortable>
      <template slot-scope="scope">
        <span v-show="!scope.row.edit" style="margin-left: 10px">{{ scope.row.domain_type }}</span>
        <!-- <el-input v-model="scope.row.domain_type" v-show="scope.row.edit"></el-input> -->
        <el-select v-model="scope.row.domain_type" placeholder="请选择" v-show="scope.row.edit" :disabled="scope.row.domain_id!=null">
          <el-option
            v-for="item in optionType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      </template>
    </el-table-column>
    <el-table-column label="线路1" sortable>
      <template slot-scope="scope">
        <span v-show="!scope.row.edit">{{scope.row.line1 }}</span>
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
        <span v-show="!scope.row.edit">{{scope.row.line2}}</span>
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
        <span v-show="!scope.row.edit">{{scope.row.line3}}</span>
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
        <el-button type="primary" @click="onEditorChange">确 定</el-button>
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
import axios from 'axios'
import qs from 'qs'

export default {
  name:'domain',
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
      loading:false,
      listQuery: {
        page: 1,
        pagesize: 20,

      },
      optionType:[{
        value:'测试',
        label:'测试'},
        {value:'线上',
        label:'线上'
      }],
      dialogNewVisible: false,
      dialogEditVisible: false,
      dialogSearchVisible: false,
      mutipleSelection: [],
      transferSelect: [],
      setList: selectList,
      tempIp:[],
      tempUpstreams:'',

      ctemp: {
        domain_name:null,
        region:null,
        domain_type:null,
        line1:null,
        line2:null,
        line3:null,
        upstreams:null,
        function:null,
        weight:null,
        max_fails:null,
        fail_timeout:null,
        edit:true
      },
      listQuery: {
        page:1,
        pagesize:20
      },
      region:[{value:'国内'},{value:'国外'}],




      options: []

    }
  },
// computed:{
//
//   linet:function(){
//     options.forEach(ele=>{
//       this.list.forEach(li=>{
//         if(li.line1===ele.value){
//           this.line1 = ele.label
//         }
//       })
//
//   })
//   return this.line1
// }
// },

watch:{
  options:function(newOp){
    this.list.forEach(ele=>{
      this.options.forEach(op=>{
        if(ele.line1===op.value){
          ele.line1=op.label
        }
        else if(ele.line2===op.value){
          ele.line2=op.label
        }
        else if(ele.line3===op.value){
          ele.line3=op.label
        }
      })
    })
  }
},
  created(){

      this.getList()


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
        this.getLine()
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
      this.list.unshift(this.ctemp)
    },
    remove(){
      if(this.list.length>this.total){
      this.list.shift()
      }
    },
    getSn(row){
      console.log(row)
      // row.upstreams.replace(/，/ig,',')
      axios.post("http://cmdb.tigerbrokers.net:8000/public/getAll",{"lhzq_sn":row.upstreams.split(",")}).then(response=>{
            let res = response.data.data
            let rowlist= row.upstreams.split(',')
            console.log(res,rowlist)
            this.tempUpstreams = JSON.stringify(res)
            console.log(this.tempUpstreams)
            res.forEach(ele=>{
               rowlist.forEach(r=>{
                 if(r===ele.lhzq_sn){
                   this.tempIp.push(r+'-'+ele.ip1+'-'+ele.ip2)
                 }
               })
            })
            const h = this.$createElement;
            this.$message({
              duration:5000,
              showClose:true,
              message: h('p', null,
          // [
          //
          //   h('i', { style: 'color: teal' }, this.tempIp)
          // ]
          this.tempIp.map(ele=>{
                return h('p',{style:'color:teal'},ele)
          })
        )
        });
        this.tempIp=[]
        // return 1
    })
  },
  handover(row){

    if(row.edit===false){
            this.loading=true
            console.log(this.tempIp)

            if(row.domain_id==null){

              console.log('this is add Item')
              this.ctemp.upstreams= this.tempUpstreams
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
                  this.list.shift()
                  this.$notify({
                      title: '失败',
                      message: response.msg,
                      type: 'warning',
                      duration: 5000
                    })
                }
                this.loading=false
                this.getList()
              }).catch(err=>{
                this.list.shift()
                this.loading=false
              })
            }else{

            row.upstreams= this.tempUpstreams
            //transfer label to value
            this.options.forEach(val=>{
                  if(row.line1===val.label){
                    row.line1=val.value
                  }
                  else if(row.line2===val.label){
                    row.line2=val.value
                  }
                  else if(row.line3===val.label){
                    row.line3=val.value
                  }
            })
            console.log(row)
            editItem(row).then(response=>{
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
               this.loading=false
               this.getList()
            }).catch(err=>{
              this.getList()
              this.loading=false
            })

        }

    }
  },
    submit(row){
      console.log(row)
      this.getSn(row)
      setTimeout(this.handover,2000,row)

      row.edit=!row.edit




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
    // edit() {
    //   editItem(this.temp).then(response =>{
    //     if(response.code=='20000'){
    //       this.$notify({
    //         title: '成功',
    //           message: response.msg,
    //           type: 'success',
    //           duration: 5000
    //       })
    //     }
    //     else{
    //       this.$notify({
    //           title: '失败',
    //           message: response.msg,
    //           type: 'warning',
    //           duration: 5000
    //         })
    //     }
    //   })
    // },
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
           this.loading= true
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
              this.loading=false
          }).catch(error => {
            this.loading=false
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
.el-input {
  width:180px;
}
</style>
