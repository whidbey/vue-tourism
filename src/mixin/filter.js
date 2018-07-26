export default {
    formatNumber(val) {
        return val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
    },
    formatPrice(price, unit = '') {
        let parts = '' + price.toFixed(2);
        parts = unit + parts.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts;
    },
    formatStatus(val) {
        const statusConfig = {
            1: '待接单',
            2: '待确认',
            3: '待支付',
            4: '已完成'
        }
        return statusConfig[val]
    }
}
