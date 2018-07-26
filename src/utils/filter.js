export default {
    formatNumber(val) {
        return val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
    },
    formatPrice(price) {
        let parts = '' + price;
        parts = parts.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts;
    },
    formatPayType(val) {
        switch (val) {
            case 1:
            case 3:
            case 5:
            case 9:
                return 'Pembayaran Online'
            case 2:
            case 4:
                return 'Koupon'
            case 8:
                return 'Koupon Kode'
            default:
                return ''
        }
    },
    formatStatus(val) {
        switch (val) {
            case 100:
                return 'Menunggu Pembayaran'
            case 102:
                return 'Sedang Dalam Proses Pembayaran'
            case 103:
                return 'Pembayaran PLN Berhasil'
            case 104:
                return 'Pembayaran PLN Gagal, Sedang Dalam Proses Refund'
            case 106:
                return 'Menunggu Pengisian Info Refund'
            case 107:
                return 'Pembayaran PLN Gagal, Berhasil Refund'
            case 108:
                return 'Sudah Dibatalkan'
            default:
                return ''
        }
    }
}
