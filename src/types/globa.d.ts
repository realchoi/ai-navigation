import { DefineComponent } from "vue"

// 声明 .vue 文件
declare module "*.vue" {
    const component: DefineComponent<object, object, any>
    export default component
}

export { }