<template>
<div class="app-container">
  <el-table :data="list" border style="width: 100%">
    <el-table-column label="用户名" prop="username" sortable>
    </el-table-column>
    <el-table-column label="权限" prop="perms" sortable>
    </el-table-column>


    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
  <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
    <el-tree :data="data2" show-checkbox node-key="id" ref="tree" :default-checked-keys="checkedKey" :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">


      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {getPerm,editPerm} from '@/api/users'
export default {
  data() {
    return {
      formLabelWidth: '120px',
      pivileage: null,
      checkedKey: null,
      isIndeterminate: true,
      list: null,
      total: null,
      choices: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pagesize: 20,
      },
      temp: {
        username: '',
        perms: ''

      },
      dialogFormVisible: false,
      dialogStatus: '',

      data2: [{
        id: '1',
        label: 'SSL证书',

            children: [{
              id: '1c',
              label: '增加'
            }, {
              id: '1u',
              label: '修改'
            }, {
              id: '1r',
              label: '查询'
            }, {
              id: '1d',
              label: '删除'
            }, {
              id: '1l',
              label: '上传'
            }]

      }, {
        id: '2',
        label: 'nginx服务器',
        children: [{
          id: '2c',
          label: '增加'
        }, {
          id: '2u',
          label: '修改'
        }, {
          id: '2r',
          label: '查询'
        }, {
          id: '2d',
          label: '删除'
        }, {
          id: '2l',
          label: '上传'
        }]
      }, {
        id: '3',
        label: 'domain管理',

            children: [{
              id: '3c',
              label: '增加'
            }, {
              id: '3u',
              label: '修改'
            }, {
              id: '3r',
              label: '查询'
            }, {
              id: '3d',
              label: '删除'
            }, {
              id: '3l',
              label: '上传'
            }]

      }, {
        id: '5',
        label: 'User'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getList()
    console.log('geting list..')
  },
  methods: {
    getList() {
      this.listLoading = true
      getPerm(this.listQuery).then(response => {
        console.log(response.data);
        this.list = response.data

        this.total = response.total
        this.listLoading = false
      }).catch((err) => {
        console.log(err)
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
    handleEdit(index, row) {
      console.log(row)
      this.temp = Object.assign({}, row)
      this.checkedKey = this.temp.perms.split(',')
      console.log(this.checkedKey)
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    update() {
      this.choices = this.$refs.tree.getCheckedKeys();
      console.log(this.choices)
      this.temp.perms = this.choices.toString()

      editPerm(this.temp).then(response => {
        console.log(response.data)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: response.data.msg,
          type: 'success',
          duration: 2000
        })
        this.getList()
      }).catch((err) => {
        console.log(err)
      })

    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    }
  }
}
</script>
