import Vue from 'vue';
import { 
  MessageBox,
  Message,
  Pagination
} from 'element-ui';

// js组件注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// css组件注册
Vue.use(Pagination)

