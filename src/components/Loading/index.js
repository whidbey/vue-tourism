import Vue from 'vue';
import LoadingComponent from './loading.vue'
const LoadingConstructor = Vue.extend(LoadingComponent);

let instancePool = null;

let getAnInstance = () => {
    if (!instancePool) {
        instancePool = new LoadingConstructor({
            el: document.createElement('div')
        })
    }
    return instancePool
};

let Loading = (isVisible) => {
    // let duration = options.duration || 1500;
    let show = typeof isVisible === 'undefined' ? true : isVisible
    console.log(show)
    let instance = getAnInstance();
    if (show) {
        document.body.appendChild(instance.$el)
    } else {
        console.log('删除加载中状态', instance.$el)
        if (instance.$el) {
            document.body.removeChild(instance.$el)
        }
    }
    Vue.nextTick(function () {
        instance.visible = show;
    });
    return instance;
};

export default Loading;
