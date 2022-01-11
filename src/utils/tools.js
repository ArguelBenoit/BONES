
export const tools = {

  /* return uuid v4 */
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  /* return formated date mm-dd-yyyy */
  date() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const yyyy = today.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  },

  /* return object with css path and last tagName */
  getPath(el) {

    // get path of clicked element (in array).
    let pathArray = [];
    while (el.parentNode) {
      if (el.id){
        pathArray.unshift(`#${el.id}`);
        break;
      } else {
        if (el == el.ownerDocument.documentElement) {
          pathArray.unshift(el.tagName);
        } else {
          for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
          pathArray.unshift(`${el.tagName}:nth-child(${c})`);
        }
        el = el.parentNode;
      }
    }
    //

    let path = pathArray.join(' > ');
    let node = document.querySelector(path);
    let tag = node.tagName;
    let contentEditable = node.contentEditable === 'true' || node.contentEditable === true;
    let isNativeInput = ['INPUT', 'TEXTAREA'].indexOf(tag) > -1;
    let isInput = contentEditable || isNativeInput;

    if (isInput) { // if last element is a native input
      return {
        isNativeInput,
        path
      };
    } else { // for DIV contentEditable true
      while (isInput === false) {
        pathArray.pop();
        path = pathArray.join(' > ');
        node = document.querySelector(path);
        tag = node.tagName;
        contentEditable = node.contentEditable === 'true' || node.contentEditable === true;
        isNativeInput = ['INPUT', 'TEXTAREA'].indexOf(tag) > -1;
        isInput = contentEditable || isNativeInput;
      }
      return {
        isNativeInput,
        path
      };
    }
  }

};
