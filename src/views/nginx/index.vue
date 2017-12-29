<template>
<div class="app-container calendar-list-container">
  <div class="filter-container" style="padding-bottom: 10px">
    <el-button type="primary" @click="dialogNewVisible=true">add</el-button>
    <el-button type="primary" @click="dialogSearchVisible=true" icon="el-icon-search">test</el-button>
    <el-button type="primary" @click="changeRole" icon="el-icon-edit">切换角色</el-button>
    <el-button type="primary" @click="MultiDelete" icon="el-icon-edit">重启服务</el-button>
    <el-button type="primary" @click="MultiDelete" icon="el-icon-edit">检测配置</el-button>
    <!-- <el-button type="primary" icon="el-icon-upload" >上传</el-button> -->
    <!-- <el-upload style="float:right;padding-bottom:10px">
      <el-button type="primary">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件(文件格式遵循导出文件)</div>
    </el-upload> -->
  </div>

  <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="35">
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


    <el-table-column label="role">

      <template slot-scope="scope">
        <!-- <span style="margin-left: 10px">{{ scope.row.role }}</span>
        <span style="margin-left: 10px">{{ scope.row.role }}</span> -->
            <el-button :type="scope.row.role=='Master'?'primary':'info'" @click='changeRole(scope.row)'>{{scope.row.role}}</el-button>
      </template>
    </el-table-column>

    <el-table-column align="center" label="编辑">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" round  @click.native="handleEdit(scope.$index,scope.row)">修改</el-button>
        <!-- <svg-icon class="nginx"icon-class="check" @click.native="cmd(scope.row,'configtest')"></svg-icon> -->
        <!-- <svg-icon class="nginx"icon-class="restart" @click.native="cmd(scope.row,'restart')"></svg-icon> -->
        <!-- <svg-icon class="nginx"icon-class="close" @click.native="cmd(scope.row,'close')"></svg-icon> -->
        <!-- <svg-icon class="nginx"icon-class="connect" @click.native="status(scope.row,'connect')"></svg-icon>
        <svg-icon class="nginx"icon-class="request" @click.native="status(scope.row,'request')"></svg-icon>
        <svg-icon class="nginx"icon-class="toggle" @click.native="changeRole(scope.row)" style="cursor:pointer;margin-left:5px"></svg-icon> -->
          <!-- <el-button type="danger" size="mini" round @click="handleDelete(scope.$index,scope.row)">删除</el-button> -->
          <el-button type="primary" size="mini" round @click="status(scope.row,'connect')">连接</el-button>
          <el-button type="primary" size="mini" round @click="status(scope.row,'request')">请求</el-button>
        <!-- <svg-icon class="nginx"icon-class="delete" @click.native="handleDelete(scope.$index,scope.row)"></svg-icon> -->
      </template>
    </el-table-column>

  </el-table>
  <div v-show="true" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
  <!-- //add -->
  <el-dialog title="add" :visible.sync="dialogNewVisible" width="550px">
    <el-form :model="ctemp" :rules="rules" ref="ctemp" label-width="100px">
      <el-form-item label="SN" label-width="120px" prop="sn">
          <el-input v-model="ctemp.sn" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="IDC" label-width="120px" prop="idc">
          <el-input v-model="ctemp.idc" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="VIP" label-width="120px" prop="vip">
          <el-input v-model="ctemp.vip" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="IP1" label-width="120px" prop="ip1">
          <el-input v-model="ctemp.ip1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="IP2" label-width="120px" prop="ip2">
          <el-input v-model="ctemp.ip2" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="role" label-width="120px" prop="role">
          <el-input v-model="ctemp.role" auto-complete="off"></el-input>
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
      <el-form-item label="SN" label-width="120px" prop="sn">
          <el-input v-model="temp.sn" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="IDC" label-width="120px" prop="idc">
          <el-input v-model="temp.idc" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="VIP" label-width="120px" prop="vip">
          <el-input v-model="temp.vip" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="IP1" label-width="120px" prop="ip1">
          <el-input v-model="temp.ip1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="IP2" label-width="120px" prop="ip2">
          <el-input v-model="temp.ip2" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="role" label-width="120px" prop="role">
          <el-input v-model="temp.role" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogEditVisible = false">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </div>
  </el-dialog>
  <!-- //search -->
  <el-dialog title="chart" :visible.sync="dialogSearchVisible" width="550px">
    <div style="height:200px;width:200px" id="echart" ref="echart">

    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogSearchVisible = false">取 消</el-button>
      <el-button type="primary" @click="">确 定</el-button>
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
  cmd,
  status
} from '@/api/nginx'

import echarts from 'echarts'

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
      chart:'',
      temp: {
        server_id:null,
        sn:null,
        idc:null,
        vip:null,
        ip1:null,
        ip2:null,
        role:null
      },
      ctemp: {
        server_id:null,
        sn:null,
        idc:null,
        vip:null,
        ip1:null,
        ip2:null,
        role:null
      },
      listQuery: {
        page:1,
        pagesize:20
      },
      rules:{
        filename:[{validator: checkEmpty, trigger:'blur'}],
        filepath:[{validator: checkEmpty, trigger:'blur'}]
      }
      // tableData: [{
      //   idc: '世纪互联',
      //   vip: '172.111.111.11',
      //   ip1: '172.111.111.1',
      //   ip2: '172.111.111.2',
      //   role: 'Master',
      //
      // }, {
      //   idc: '世纪互联',
      //   vip: '172.111.111.11',
      //   ip1: '172.111.111.1',
      //   ip2: '172.111.111.2',
      //   role: 'Master',
      // }, {
      //   idc: '世纪互联',
      //   vip: '172.111.111.11',
      //   ip1: '172.111.111.1',
      //   ip2: '172.111.111.2',
      //   role: 'Master',
      // }, {
      //   idc: '世纪互联',
      //   vip: '172.111.111.11',
      //   ip1: '172.111.111.1',
      //   ip2: '172.111.111.2',
      //   role: 'Master',
      // }]

    }
  },
  created(){
    this.getList()
  },
  mounted(){
    console.log(document.getElementById('echart'))
    console.log(this.$refs.echart)
    this.initChart()
  },
  beforeDestory(){
    this.chart.dispose()
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
        // this.$set(row, 'role', 'slave')
        row.role='slave'
        this.cmd(row,'change')
      } else {
        this.$set(row, 'role', 'Master')
        this.cmd(row,'change')
      }
    },
    create() {
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
    cmd(row,action){
      cmd({id:[row.server_id],action:action}).then(response=>{
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
    status(row,action){
      status({id:[row.server_id],action:action}).then(response=>{
        if(response.code=='20000'){
          this.$notify({
            title: '成功',
              message: response.data[0],
              type: 'success',
              duration: 50000
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
          var idList = this.setList.map(function(item,index){
                  return item.server_id
          })
          console.log(idList)
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
             deleteItem({server_id: [idList]}).then(response => {
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
    handleEdit(index,row){
      console.log(row)
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
         deleteItem({server_id: [row.server_id]}).then(response => {
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
     initChart(){
       this.chart = echarts.init(document.getElementById('echart'))

       this.chart.setOption({
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }]
    })
     }
  }
}
</script>
<style scoped>
.nginx {
  cursor: pointer;
  margin-left: 5px;
}
</style>
