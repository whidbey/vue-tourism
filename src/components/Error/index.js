import Vue from 'vue';
import ErrorComponent from './error.vue'
const ErrorConstructor = Vue.extend(ErrorComponent);

let instancePool = null;

let getAnInstance = () => {
    if (!instancePool) {
        instancePool = new ErrorConstructor({
            el: document.createElement('div')
        })
    }
    return instancePool
};

let Error = (isVisible) => {
    // let duration = options.duration || 1500;
    let show = typeof isVisible === 'undefined' ? true : isVisible
    console.log(show)
    let instance = getAnInstance();
    if (show) {
        document.body.appendChild(instance.$el)
    } else {
        console.log('删除加载中状态', instance.$el)
        document.body.removeChild(instance.$el)
    }
    Vue.nextTick(function () {
        instance.visible = show;
    });
    return instance;
};

export default Error;
