<template>

  <div class="app-container">
    添加/修改讲师
    <el-form label-width="120px">

      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>

      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="teacher.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
          </el-button>
          <!--
          v-show：是否显示上传组件
          :key：类似于id，如果一个页面多个图片上传控件，可以做区分
          :url：后台上传的url地址
          @close：关闭上传组件
          @crop-upload-success：上传成功后的回调 -->
         <image-cropper
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/eduoss/fileoss'"
                   field="file"
                   @close="close"
                   @crop-upload-success="cropSuccess"/>
      </el-form-item>


      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>

    </el-form>

  </div>

</template>
<script>
import teacherApi from '@/api/teacher/teacher.js'

//头像start
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
//end
export default {
  components: { ImageCropper, PanThumb },
  data(){
    return{
      teacher:{
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: process.env.OSS_PATH + '/avatar/default.jpg'
      },
      //上传弹框是否显示
      imagecropperShow:false,
      imagecropperKey:0,//长传组件key值
      BASE_API:process.env.BASE_API, // 接口API地址
      saveBtnDisabled:false
    }
  },
  created(){
    this.init()

  },

  watch:{ //监听 ,清除修改到添加页码的user值
    $route(to,from){
      this.init()
    }
  },
  methods:{
    //关闭上传弹框
    close(){
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(){
       console.log(data)
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1

    },

    init(){
      if(this.$route.params && this.$route.params.id){
            const id = this.$route.params.id
            this.getInfo(id)
          }else{
            //清空表单
            this.teacher={}
          }
    },

    //根据讲师id
    getInfo(id){
      teacherApi.getTeacherInfo(id)
        .then(response=>{
          this.teacher = response.data.teacher
        });
    },

    saveOrUpdate(){
      //判断是修改还是添加
        this.saveBtnDisabled = true
        if(!this.teacher.id){
          this.saveTeacher()
        }else{
          this.updateTeacher()
        }
        
    },
      //保存
      saveTeacher(){
        teacherApi.addTeacher(this.teacher)
        .then(response => {
          this.$message({
            type:'success',
            message:'添加成功!'
          });
          this.$router.push({path:'/teacher/table'})
        })
      },
      updateTeacher(){
        teacherApi.updateTeacherInfo(this.teacher)
          .then(response => {
            this.$message({
                type:'success',
                message:'修改成功!'
              });
            this.$router.push({path:'/teacher/table'})
        })
      }
  }
}
</script>