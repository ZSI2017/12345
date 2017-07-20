

const localEvent = function () {
    this.get = function (item) {
        return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
    }
    this.set = function (item,obj) {
        localStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function (item) {
        localStorage.removeItem(item);
    }
}

export default new localEvent();

