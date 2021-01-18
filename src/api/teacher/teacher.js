import request from '@/utils/request'

export default{
    //1、讲师列表 （分页查询）
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            // url:'/table/list'+current+"/"+limit,
            url:`/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method:'post',
            //teacherQuery条件对象，后端使用requestbody获取数据
            data:teacherQuery
        })
    },
    //删除讲师
    deleteTeacherId(id){
        return request({
            url:`/eduservice/teacher/${id}`,
            method:'delete'
        })
    },
    addTeacher(teacher){
        return request({
            url:`/eduservice/teacher/addTeacher`,
            method:'post',
            data:teacher
        })
    },
   getTeacherInfo(id){
        return request({
            url:`/eduservice/teacher/getTeacher/${id}`,
            method:'get'
        })
   },
   updateTeacherInfo(teacher){
        return request({
            url:`/eduservice/teacher/updateTeacher`,
            method:'post',
            data:teacher
        })
   }


}

