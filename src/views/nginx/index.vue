<template>
<div class="app-container calendar-list-container">
  <div class="filter-container" style="padding-bottom: 10px">
    <el-button type="primary" @click="dialogNewVisible=true">add</el-button>
    <!-- <el-button type="primary" @click="chartDisplay" icon="el-icon-search">test</el-button> -->
    <el-button type="primary" @click="changeRole">切换角色</el-button>
    <el-button type="primary" @click="cmd('restart')">重启服务</el-button>
    <el-button type="primary" @click="cmd('configtest')">检测配置</el-button>
    <el-button type="danger" @click="MultiDelete">删除</el-button>

  </div>

  <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
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
    <el-table-column label="type" sortable>
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.server_type }}</span>
      </template>
    </el-table-column>

    <el-table-column label="role">

      <template slot-scope="scope">
        <!-- <span style="margin-left: 10px">{{ scope.row.role }}</span>
        <span style="margin-left: 10px">{{ scope.row.role }}</span> -->
        <!-- @click='changeRole(scope.row)' -->
            <el-button :type="scope.row.role==='master'?'primary':'info'" >{{scope.row.role}}</el-button>
      </template>
    </el-table-column>

    <el-table-column align="center" label="编辑">
      <template slot-scope="scope">
          <el-button type="primary" size="mini" round  @click.native="handleEdit(scope.$index,scope.row)">修改</el-button>
          <el-button type="primary" size="mini" round @click="status(scope.row,'connect')">连接</el-button>
          <el-button type="primary" size="mini" round @click="status(scope.row,'request')">请求</el-button>
        <!-- <svg-icon class="nginx"icon-class="delete" @click.native="handleDelete(scope.$index,scope.row)"></svg-icon> -->
      </template>
    </el-table-column>

  </el-table>
  <div v-show="true" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>

  <!-- //add -->
  <el-dialog title="add" :visible.sync="dialogNewVisible" width="550px">
    <el-form :model="ctemp" :rules="rules" ref="ctemp" label-width="100px">
      <el-form-item label="SN" label-width="120px" prop="sn">
        <el-input v-model="ctemp.sn" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="ServerType" label-width="120px" prop="server_type">
        <!-- <el-input v-model="ctemp.server_type" auto-complete="off"></el-input> -->
        <el-select v-model="ctemp.server_type" placeholder="请选择">
          <el-option
            v-for="item in optionType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="VIP" label-width="120px" prop="vip">
        <el-input v-model="ctemp.vip" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Role" label-width="120px" prop="role">
        <!-- <el-input v-model="ctemp.role" auto-complete="off"></el-input> -->
        <el-select v-model="ctemp.role" placeholder="请选择">
          <el-option
            v-for="item in optionRole"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
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
  <!-- //chart -->
  <el-dialog title="chart" :visible.sync="dialogSearchVisible" width="550px" height="550px">
    <el-date-picker
     size="small"
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
    <el-button type="primary" size="small" @click="searching">搜索</el-button>
    <div id="echart" style="height:500px;width:500px" ref="echart">
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogSearchVisible = false">取 消</el-button>

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

// var echarts =  require('echarts')
import echarts from 'echarts'
import {formatDateTime} from '@/utils'

export default {
  data() {

    let selectList = new Set()
    var checkEmpty = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error('输入不能为空'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      total: null,
      listLoading: true,
      idList: null,
      date:[],
      item:'',
      loading:false,
      listQuery: {
        page: 1,
        pagesize: 20,

      },

      chartData:{
        start_time:'',
        end_time:'',
        update_date:[],
        closing:[],
        fin_wait1:[],
        fin_wait2:[],
        syn_recv:[],
        time_wait:[],
        close_wait:[],
        estab:[],
        last_ack:[],
        syn_sent:[],
        //request
        active:[],
        reading:[],
        waiting:[],
        writing:[]

      },

      dialogNewVisible: false,
      dialogEditVisible: false,
      dialogSearchVisible: false,
      mutipleSelection: [],
      transferSelect: [],
      setList: selectList,
      chart: '',
      optionType:[{
        value:'测试',
        label:'测试'},
        {value:'线上',
        label:'线上'
      }],
      optionRole:[{
        value:'master',
        label:'master'},
        {value:'slave',
        label:'slave'
      }],
      temp: {
        server_id: null,
        sn: null,
        idc: null,
        vip: null,
        ip1: null,
        ip2: null,
        role: null
      },
      ctemp: {
        // server_id: null,
        server_type:null,
        sn: null,
        // idc: null,
        vip: null,
        // ip1: null,
        // ip2: null,
        role: null
      },
      listQuery: {
        page: 1,
        pagesize: 20
      },
      rules: {
        filename: [{
          validator: checkEmpty,
          trigger: 'blur'
        }],
        filepath: [{
          validator: checkEmpty,
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getList()
  },
  // mounted(){
  //   // console.log(document.getElementById('echart'))
  //   // console.log(this.$refs.echart)
  //   // console.log(this.$refs)
  //   this.$nextTick().then(function(){
  //     this.initChart()
  //   })
  //
  // },
  beforeDestory() {
    this.chart.dispose()
  },
  methods: {

    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(error => {
        console.log(error)
      })

    },

    changeRole(row) {

      console.log(row)
      if (row.role == 'Master') {
        // this.$set(row, 'role', 'slave')
        this.$nextTick(function() {
          row.role = 'slave'
        })

        this.cmd('change')
      } else {
        this.$nextTick(function() {
          this.$set(row, 'role', 'Master')
        })

        this.cmd('change')
      }
    },
    create() {
      addItem(this.ctemp).then(response => {
        cosole.log(response)
        if (response.code == '20000') {
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success',
            duration: 5000
          })
        } else {
          this.$notify({
            title: '失败',
            message: response.msg,
            type: 'warning',
            duration: 5000
          })
        }
        this.dialogNewVisible = false
      }).catch(error=>{})
    },
    edit() {
      editItem(this.temp).then(response => {
        if (response.code == '20000') {
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success',
            duration: 5000
          })
        } else {
          this.$notify({
            title: '失败',
            message: response.msg,
            type: 'warning',
            duration: 5000
          })
        }
      })
    },
    cmd(act) {
      const h = this.$createElement;
      this.$msgbox({
        title: '操作',
        message: h('p', null, [
          h('span', null, '确定此操作'),
          h('i', {
            style: 'color: red'
          })
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(action => {
        this.loading = true
        cmd({
          id: this.idList,
          action: act
        }).then(response => {
            this.loading = false
          if (response.code == '20000') {
            this.$notify({
              title: '成功',
              message: response.msg,
              type: 'success',
              duration: 5000
            })
          } else {
            this.$notify({
              title: '失败',
              message: response.data[0].failed,
              type: 'warning',
              duration: 5000
            })
          }
        })
      }).catch(err => {})
    },
    status(row, act) {
      var date =  new Date()
       this.chartData.end_time = formatDateTime(date)
       this.chartData.start_time = formatDateTime(date,30)
       // this.date.push(new Date(this.chartData.start_time),new Date(this.chartData.end_time))
       this.date.splice(0,1,new Date(this.chartData.start_time))
       this.date.splice(1,1,new Date(this.chartData.end_time))
       this.item ={row,act}
       console.log(this.item)
      console.log(this.date,this.chartData.start_time,this.chartData.end_time)
      const h = this.$createElement;
      this.$msgbox({
        title: '操作',
        message: h('p', null, [
          h('span', null, '确定操作此条记录？'),
          h('i', {
            style: 'color: red'
          })
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(action => {
        status({
          id: [row.server_id],
          action: act,
          start_time: this.chartData.start_time,
          end_time: this.chartData.end_time
        }).then(response => {
          if (response.code == '20000') {
            this.$notify({
              title: '成功',
              message: response.data[0],
              type: 'success',
              duration: 1000
            })
            var res = response.data[0]
            this.chartData.update_date = res.update_date
            this.chartData.closing =  res.closing
            this.chartData.fin_wait1 = res.fin_wait_1
            this.chartData.fin_wait2 = res.fin_wait_2
            this.chartData.syn_recv = res.syn_recv
            this.chartData.time_wait = res.time_wait
            this.chartData.close_wait = res.close_wait
            this.chartData.estab =  res.estab
            this.chartData.last_ack = res.last_ack
            this.chartData.syn_sent = res.syn_sent
            this.chartData.active = res.active
            this.chartData.reading = res.reading
            this.chartData.waiting = res.waiting
            this.chartData.writing = res.writing

            console.log(this.chartData)
            this.chartDisplay()

          } else {
            this.$notify({
              title: '失败',
              message: response.msg,
              type: 'warning',
              duration: 5000
            })
          }
        }).catch(err=>{})
      }).catch(err => {})
    },
    MultiEdit() {

    },
    MultiDelete() {

      console.log(this.idList)
      const h = this.$createElement;
      this.$msgbox({
        title: '删除',
        message: h('p', null, [
          h('span', null, '删除此条记录？'),
          h('i', {
            style: 'color: red'
          })
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(action => {
        deleteItem({
          server_id: this.idList
        }).then(response => {
          console.log(response.data);
          if (response.data.code == '20000') {
            this.$notify({
              title: '成功',
              message: response.data.msg,
              type: 'success',
              duration: 5000
            })
          } else {
            this.$notify({
              title: '失败',
              message: response.data.msg,
              type: 'warning',
              duration: 5000
            })
          }
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }).catch(error => {})
      });
    },
    handleEdit(index, row) {
      console.log(row)
      this.dialogEditVisible = true
      this.temp = Object.assign({}, row)
      console.log(this.temp)
    },
    handleDelete(index, row) {
      const h = this.$createElement;
      this.$msgbox({
        title: '删除',
        message: h('p', null, [
          h('span', null, '删除此条记录？'),
          h('i', {
            style: 'color: red'
          })
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(action => {
        deleteItem({
          server_id: [row.server_id]
        }).then(response => {
          console.log(response.data);
          if (response.data.code == '20000') {
            this.$notify({
              title: '成功',
              message: response.data.msg,
              type: 'success',
              duration: 5000
            })
          } else {
            this.$notify({
              title: '失败',
              message: response.data.msg,
              type: 'warning',
              duration: 5000
            })
          }
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }).catch(error => {})
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
      this.idList = this.setList.map(function(item, index) {
        return item.server_id
      })
      // this.temp = Object.assign({}, val[0])
      console.log(this.idList)

    },
    chartDisplay() {

      this.dialogSearchVisible = true
      this.$nextTick(function() {
        // console.log(this.$refs.echart)
        // console.log(document.getElementById("echart"))
        this.initChart()
      })
    },
    searching(){
      console.log("time is %o",this.date)

      status({id: [this.item.row.server_id],
      action: this.item.act,
      start_time: this.date[0],
      end_time: this.date[1]}).then(response=>{
        var res = response.data[0]
        this.chartData.update_date = res.update_date
        this.chartData.closing =  res.closing
        this.chartData.fin_wait1 = res.fin_wait_1
        this.chartData.fin_wait2 = res.fin_wait_2
        this.chartData.syn_recv = res.syn_recv
        this.chartData.time_wait = res.time_wait
        this.chartData.close_wait = res.close_wait
        this.chartData.estab =  res.estab
        this.chartData.last_ack = res.last_ack
        this.chartData.syn_sent = res.syn_sent

        console.log(this.chartData)
        this.chartDisplay()
      }).catch(err=>{})

    },
    initChart() {
      this.chart = echarts.init(document.getElementById('echart'))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%'];
          }
        },
        legend: {
           data:['sync_wait','fin1','fin2']
         },
        title: {
          left: 'center',
          text: 'information',
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {show:true}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartData.update_date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [{
              name:'close_wait',
              type:'line',
              data: this.chartData.close_wait
        },
        {
              name:'closing',
              type:'line',
              data: this.chartData.closing
        },
        {
              name:'estab',
              type:'line',
              data: this.chartData.estab
        },
        {
              name:'fin_wait1',
              type:'line',
              data: this.chartData.fin_wait_1
        },
        {
              name:'fin_wait2',
              type:'line',
              data: this.chartData.fin_wait_2
        },
        {
              name:'last_ack',
              type:'line',
              data: this.chartData.last_ack
        },
        {
              name:'syn_recv',
              type:'line',
              data: this.chartData.syn_recv
        },
        {
              name:'syn_sent',
              type:'line',
              data: this.chartData.syn_sent
        },
        {
              name:'time_wait',
              type:'line',
              data: this.chartData.time_wait
        },
        {
          name:'waiting',
          type:'line',
          data: this.chartData.waiting
        },
        {
          name:'reading',
          type:'line',
          data: this.chartData.reading
        },
        {
          name:'active',
          type:'line',
          data: this.chartData.active
        },
        {
          name:'writing',
          type:'line',
          data: this.chartData.writing
        }
      ]
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
