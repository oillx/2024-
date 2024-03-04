<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">+新增</el-button>
        <el-form :inline="true" :model="formInline" >
            <el-form-item label="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="table">
        <el-table :data="list" style="width: 100%">
             <el-table-column 
             v-for = "item in tableLabel"
             :key = "item.prop"
             :label = "item.label"
             :prop = "item.prop"
             :width = "item.width ? item.width : 125 "
             />
             <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button  type="primary" size="small" @click="handleEdit(scope.row)"> 编辑 </el-button>
                    <el-button  type="danger" size="small"  @click="handleDelete(scope.row)"> 删除 </el-button>
                </template>
            </el-table-column>
        </el-table>
         <el-pagination
           small
           background
           layout="prev, pager, next"
           :total="configPage.total"
           @current-change = "changePage"
           class="mt-4 pager"
         />
    </div>

    <el-dialog
    v-model="dialogVisible"
    :title= "dialogTitle == 'add' ? '新增用户' : '编辑用户' "
    width="50%"
    :before-close="handleClose"
    >
        <el-form :inline="true" :model="formUser" ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item 
                    label="姓名" 
                    prop="name"
                    :rules="[{required: true, message: '姓名是必填项'}]">
                    <el-input v-model="formUser.name" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="性别" prop="sex"  :rules="[{required: true, message: '性别是必选项'}]">
                        <el-select v-model="formUser.sex" placeholder="请选择" >
                            <el-option label="男" value="0" />
                            <el-option label="女" value="1" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="地址" prop="addr" :rules="[{required: true, message: '地址是必填项'}]">
                        <el-input v-model="formUser.addr" placeholder="请输入" clearable />
                    </el-form-item>

                </el-col>

                <el-col :span="12">
                    <el-form-item 
                    label="年龄" 
                    prop="age"
                    :rules="[{required: true,message: '姓名是必填项'},{type: 'number',message:'年龄必须是数字'}]">
                    <el-input v-model.number="formUser.age" placeholder="请输入" clearable />
                    </el-form-item>

                    <el-form-item label="出生日期" prop="birth" :rules="[{required: true, message: '出生日期是必选项'}]">
                        <el-date-picker
                          v-model="formUser.birth"
                          type="date"
                          placeholder="请选择"
                          style="width: 100%"
                        />
                    </el-form-item>

                    
                </el-col>               
            </el-row>
        </el-form>
        <template #footer >
          <div class="dialog-footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">
              确定
            </el-button>
          </div>
        </template>
    </el-dialog>
    
</template>

<script setup>
import { getCurrentInstance,reactive,ref } from 'vue'
import { onMounted } from 'vue'
    const { proxy } = getCurrentInstance();
    
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 400,
      },
    ]);
    onMounted(() => {
        getUserData( configPage );
    });
    const list = ref([]);
    // 分页器
    const configPage = reactive({
        total: 0,
        page: 1,
        name: ''
    });
    const getUserData = async (myPage) => {
        let res = await proxy.$api.getUserData(myPage);
        configPage.total = res.count
        list.value = res.list.map((item) => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
        });
 
    };
     // 点击当前页
    const changePage = (page) => {
        configPage.page = page;
        getUserData( configPage ); // 重新发送请求，获取当前页数据
    };

    // 搜索框
    const formInline = reactive({
        keyword: ''
    })
    // 搜索函数
    const handleSearch = () => {
        configPage.name = formInline.keyword;
        getUserData( configPage );
    }
    // 控制模态框的显示or隐藏
    const dialogVisible = ref(false);
    // 关闭对话框
    const handleClose = (done) => {
      ElMessageBox.confirm("确定关闭吗?")
        .then(() => {
            proxy.$refs.userForm.resetFields(); // 清空数据，使用 resetFields 的方法时，prop 属性是必填的
            done();
        })
        .catch(() => {
          // catch error
        });
    };

    // 新建用户User的数据
    const formUser = reactive({
        name: '', // 添加用户的用户名
        age: '',  // 添加用户的年龄
        sex: '',  // 添加用户的性别 男 0女 1
        birth: '', // 添加用户的出生日期
        addr: '', // 添加用户的地址
    })

    // 定义变量区分对话框标题是：编辑 or 新增
    let dialogTitle = ref('add')

    // 对用户输入的时间进行格式调整
    const timeFormat = (time) => {
        var time = new Date(time); // new Date(time) 会解析 time 并创建一个对应的 Date 对象。
        var year = time.getFullYear();
        var month = time.getMonth() + 1; // 从0开始计数
        var date = time.getDate(); // 范围是从 1 到 31
        function add(m) {
            return m < 10 ? "0" + m : m;
        }
        return year + "-" + add(month) + "-" + add(date);
    }
    // 对话框 确定按钮函数 -- 调教新增加的用户数据
    const onSubmit =  () => {
        // 表单校验 符合rules才能点击确定提交
        proxy.$refs.userForm.validate( async (valid) => {
            if(valid) {
                if (dialogTitle.value == 'add'){ // 新增状态
                    console.log(dialogTitle.value)
                    console.log(formUser)
                    formUser.birth = timeFormat(formUser.birth)
                    let res = await proxy.$api.addUserData(formUser)
                    if (res) {
                        dialogVisible.value = false;  // 关闭对话框
                        proxy.$refs.userForm.resetFields(); // 清空数据，使用 resetFields 的方法时，prop 属性是必填的
                        getUserData( configPage ); // 重新发送请求
                    }
                }else {  //编辑状态
                    console.log(formUser)
                    formUser.sex == '男' ? (formUser.sex = 1) : (formUser.sex = 0)
                    let res = await proxy.$api.editUserData(formUser)
                    console.log(res)
                    if (res) {
                        dialogVisible.value = false;  // 关闭对话框
                        proxy.$refs.userForm.resetFields(); // 清空数据，使用 resetFields 的方法时，prop 属性是必填的
                        getUserData( configPage ); // 重新发送请求
                    }
                }
            }else{
                    // 全局提示
                     ElMessage({
                     showClose: true,
                     message: '请输入正确的内容',
                     type: 'error',
                     })
                }
        })

    }
    // 对话框 取消按钮函数
    const handleCancel = async () =>{
        dialogVisible.value = false;  // 关闭对话框
        proxy.$refs.userForm.resetFields(); // 清空数据，使用 resetFields 的方法时，prop 属性是必填的
    }

    // 编辑按钮 点击函数
    const handleEdit = (row) => {
        dialogTitle.value = 'edit';
        dialogVisible.value = true;  // 开启对话框
        row.sex == 0 ? (row.sex = '男') : (row.sex = '女')
        // 异步 时间戳
        proxy.$nextTick(() => {
            // 浅拷贝
            Object.assign(formUser,row)
        })

    }
    // 新增用户 点击函数
    const handleAdd = () => {
        dialogTitle.value = 'add';
        dialogVisible.value = true;  // 开启对话框
    }
    // 删除用户
    const handleDelete = (row) => {
        ElMessageBox.confirm("确定删除吗?")
        .then( async () => {
            await proxy.$api.deleteUserData({
                id: row.id
            }); // 清空数据，使用 resetFields 的方法时，prop 属性是必填的
            ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success'
            })
            getUserData( configPage );
        })
        .catch(() => {
          // catch error
        });
    }
</script>

<style lang="less" scoped>
.table {
    position: relative;
        .pager {
        position: absolute;
        right: 0;
        padding: 15px 0px 25px 0px;
    }
}
.user-header {
    display: flex;
    justify-content: space-between;
}
.el-dialog{
    .el-form-item{
    width: 80%;
    }
}
</style>