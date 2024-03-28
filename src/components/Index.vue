<template>
    <div class="index">
        <div class="index-left">
            <ul>
                <li>
                    <router-link to="/discover"><span class="iconfont icon-yinle">发现音乐</span></router-link>
                </li>
                <li>
                    <router-link to="/recommend"><span class="iconfont icon-yinleliebiao-">推荐歌曲</span></router-link>
                </li>
                <li>
                    <router-link to="/newsongs"><span class="iconfont icon-music"></span>热歌榜</router-link>
                </li>
                <li>
                    <span @click="dialogLoginVisible = true">登录</span> / <span
                        @click="dialogRegisterVisible = true">注册</span>
                </li>
                <li>
                    <router-link to="/userinfo"><span class="iconfont icon-user"></span>个人中心</router-link>
                </li>
            </ul>
        </div>
        <main>
            <el-scrollbar style="height:100%">
                <slot></slot>
            </el-scrollbar>
        </main>


        <el-dialog title="登录" :visible.sync="dialogLoginVisible" :append-to-body="true">
            <el-form :model="Loginform">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="Loginform.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="Loginform.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLoginVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogLoginVisible = false">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="注册" :visible.sync="dialogRegisterVisible" :append-to-body="true">
            <el-form :model="Registerform">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="Registerform.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="Registerform.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="Registerform.email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRegisterVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogRegisterVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogRegisterVisible: false,
            dialogLoginVisible: false,
            Loginform: {
                username: '',
                password: ""
            },
            Registerform: {
                username: '',
                password: "",
                email: ""
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        Login() {
            this.getRequest(
                "/user/login/" + this.loginForm.username + "/" + this.loginForm.password
            ).then((resp) => {
                if (resp !== "") {
                    var token = resp.data;
                    localStorage.setItem('token', token);
                }
            });
            console.log("发送登陆请求");
        },
    }
}
</script>

<style>
.index {
    /* height: 800px; */
    display: flex;
}

.index-left {
    width: 200px;
    min-width: 200px;
    /* background-color: #ededed; */
    text-align: center;
    border-right: 1px solid #ededed;
}

.index-left ul {
    list-style: none;
}

.index-left li {
    cursor: pointer;
    letter-spacing: .3rem;
    height: 60px;
    line-height: 60px;
    display: flex;
}

.index-left li:hover {
    background-color: #ededed;
}

.index-left a {
    text-decoration: none;
    color: #333;
    display: block;
    width: 100%;
    height: 100%;
    font-size: 18px;
    padding-left: 30px;
    text-align: left;
}

.index-left a::before {
    margin-right: 10px;
}

.router-link-active {
    color: #e74c3c !important;
}

main {
    flex: 1;
    min-width: 750px;
    /* height: 800px; */
    /* overflow-y: scroll; */
    /* background-color: skyblue; */
}
</style>