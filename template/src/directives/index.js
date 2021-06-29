export const upper = {
  bind: function (el, binding) {
    el.addEventListener('keyup', function (event) {
      event.target.value = event.target.value.toUpperCase()
      binding.value.set[binding.value.name] = event.target.value
    })
  }
}

export const authority = {
  inserted: function (el, binding, vnode) {
    let loginUser = vnode.context.$store.getters.CUSTOMER_LOGINCUSTOMER.data
    let roleAuthorization = (loginUser.RoleAuthorization || '').split(',')
    let value = binding.value
    value = Array.isArray(value) ? value : `${value}`.split(',')
    roleAuthorization.push('0000') // 0000 表示有权限
    let hasAuthority = value.some(item => roleAuthorization.includes(`${item}`))
    if (!roleAuthorization.includes('1') && !hasAuthority) {
      el.parentNode.removeChild(el)
    }
  }
}

export const dialogDrag = {
  bind: function (el) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')

    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const screenWidth = document.body.clientWidth // body当前宽度
      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth // 对话框宽度
      const dragDomheight = dragDom.offsetHeight // 对话框高度

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left')
      let styT = sty(dragDom, 'top')

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\\%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/\\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      };

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft)
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-(top) > minDragDomTop) {
          top = -(minDragDomTop)
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        let _top = top + styT
        // _top = _top < 0 ? 0 : _top

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${_top}px;`
        /* if (+_top === 0) {
          dragDom.style.cssText += `margin-top:0;`
        } */
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    // 弹框可拉伸最小宽高
    let minWidth = 500
    let minHeight = 300
    // 拉伸
    let resizeEl = document.createElement('div')
    dragDom.appendChild(resizeEl)
    // 在弹窗右下角加上一个10-10px的控制块
    resizeEl.style.cursor = 'se-resize'
    resizeEl.style.position = 'absolute'
    resizeEl.style.height = '10px'
    resizeEl.style.width = '10px'
    resizeEl.style.right = '0px'
    resizeEl.style.bottom = '0px'
    // 鼠标拉伸弹窗
    resizeEl.onmousedown = (e) => {
      // 记录初始x位置
      const clientX = e.clientX
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - resizeEl.offsetLeft
      const disY = e.clientY - resizeEl.offsetTop

      const dialogBodyEl = el.querySelector('.el-dialog__body')
      dialogBodyEl.style.cssText += ';overflow:auto;'

      const dialogFooterEl = el.querySelector('.el-dialog__footer')
      document.onmousemove = function (e) {
        e.preventDefault() // 移动时禁用默认事件

        // 通过事件委托，计算移动的距离
        const x = e.clientX - disX + (e.clientX - clientX)// 这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
        const y = e.clientY - disY
        // 比较是否小于最小宽高
        dragDom.style.width = x > minWidth ? `${x}px` : minWidth + 'px'
        dragDom.style.height = y > minHeight ? `${y}px` : minHeight + 'px'
        let bodyH = y > minHeight ? y : minHeight
        let height = bodyH - 30 * 2 - 50
        if (dialogFooterEl) {
          height -= 65
        }
        dialogBodyEl.style.height = `${height}px`
      }
      // 拉伸结束
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}