<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button type="primary" @click="add">add</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="日期" width="160">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="120">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="城市" width="120">
        <template scope="scope">
          <span v-show="!scope.row.edit">{{scope.row.city1}}</span>
          <el-select v-show="scope.row.edit" v-model="scope.row.city1"  placeholder="请选择">
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="城市" width="120">
        <template scope="scope">
          <span v-show="!scope.row.edit">{{scope.row.city2}}</span>
          <el-select v-show="scope.row.edit" v-model="scope.row.city2"  placeholder="请选择">
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="城市" width="120">
        <template scope="scope">
          <span v-show="!scope.row.edit">{{scope.row.city3}}</span>
          <el-select v-show="scope.row.edit" v-model="scope.row.city3"  placeholder="请选择">
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编辑" width="120">
        <template scope="scope">
          <el-button :type="scope.row.edit?'success':'primary'" @click='scope.row.edit=!scope.row.edit' size="small" icon="edit">{{scope.row.edit?'完成':'编辑'}}</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'inline_edit-table_demo',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          city1: '广州',
          city2: '北京',
          city3: '将军澳',
          address: '上海市普陀区金沙江路 1518 弄',
          edit: false
        }, {
          date: '2016-05-04',
          name: '王小虎',
          city1: '广州',
          city2: '北京',
          city3: '将军澳',
          address: '上海市普陀区金沙江路 1517 弄',
          edit: false
        }, {
          date: '2016-05-01',
          name: '王小虎',
          city1: '广州',
          city2: '北京',
          city3: '将军澳',
          address: '上海市普陀区金沙江路 1519 弄',
          edit: false
        }, {
          date: '2016-05-03',
          name: '王小虎',
          city1: '广州',
          city2: '北京',
          city3: '将军澳',
          address: '上海市普陀区金沙江路 1516 弄',
          edit: false
        }],
        cities: [{
          value: '北京',
          label: '北京'
        }, {
          value: '广州',
          label: '广州'
        }, {
          value: '将军澳',
          label: '将军澳'
        }, {
          value: '荃湾',
          label: '荃湾'
        }, {
          value: '深圳',
          label: '深圳'
        }, {
          value: '国外',
          label: '国外'
        }],
        value6: ''
      }
    },
    methods: {

      add() {
        this.tableData.unshift({ data: '', name: '', city1: '', city2: '', city3: '', address: '', edit: true })
      }
    }
  }
</script>
