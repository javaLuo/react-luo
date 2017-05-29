import $ from 'jquery';
import loading from '../../assets/loading.gif';

/* -- 验证过后自动改变效果 -- */
function loshow(t, isok) {
  const $t = $(t);
  const $p = $t.parents('.lodiv');
  if (isok) {
    $p.find('.loisok').removeClass('all_none');
    $p.find('.loisno').addClass('all_none');
    $t.removeClass('lonopass');
  } else {
    $p.find('.loisok').addClass('all_none');
    $p.find('.loisno').removeClass('all_none');
    $t.addClass('lonopass');
  }
}

// 是否是整数
function loint(t) {
  const v = $(t).val();
  const reg = /^-?[1-9]\d*$/;
  const isok = !!reg.test(v);
  loshow(t, isok);
  return isok;
}
// 是否是正确的手机号码
function lophone(t) {
  const v = $(t).val();
  const reg = /^[1][358][0-9]{9}$/g;
  const isok = !!reg.test(v);
  loshow(t, isok);
  return isok;
}
// 是否为非空(非空返回true,空返回false)
function lononull(t) {
  let v = $(t).val();
  v = v.replace(/(^\s*)|(\s*$)/g, '');
  const isok = !!(v.replace(/(^\s*)|(\s*$)/g, ''));
  loshow(t, isok);
  return isok;
}
// 密码位数验证(自动去掉空格)
function lopwd(t) {
  const v = $(t).val();
  const reg = /^[^\s]{6,18}$/g;
  const isok = !!reg.test(v);

  // 关联触发密码repeat验证
  if ($(t).hasClass('lo_pwdr0')) {
    $(t).parents('.locheck').find('.lo_pwdr').trigger('keyup');
  }

  loshow(t, isok);
  return isok;
}
// 密码repeat验证
function lopwdr(t) {
  const $t = $(t);
  const $t2 = $t.parents('.locheck').find('.lo_pwdr0').eq(0);
  const v1 = $(t).val();
  const v2 = $t2.val();
  if (v1 && v1 === v2) {
    loshow(t, true);
    return true;
  }
  loshow(t, false);
  return false;
}
// 单选框或复选框是否已选中
function lochecked(t) {
  const isok = $(t).is(':checked');
  loshow(t, isok);
  return isok;
}
// 正确的邮箱
function loemail(t) {
  const v = $(t).val();
  if ($(t).hasClass('lo_null') && !v) { // 可以为空
    loshow(t, true);
    return true;
  }
  const reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  const isok = !!reg.test(v);
  loshow(t, isok);
  return isok;
}
// 两个验证码是否相同
function loyzm(t) {
  const $t = $(t);
  console.log(t);
  const yzm = t.getAttribute('data-yzm');
  console.log(yzm);
  const v = $t.val();
  if (yzm === v) {
    loshow(t, true);
    return true;
  }
  loshow(t, false);
  return false;
}

/* -- 手机验证码按钮倒计时效果 -- */
function phoneSecurityTime(o, p1) { // o为按钮的对象，p为倒计时剩余时间
  let p = p1;
  if (p <= 0) {
    o.removeClass('marking');
    o.text('重新获取'); // 改变按钮中value的值
  } else {
    o.addClass('marking'); // 倒计时过程中禁止点击按钮
    o.text(`重新获取(${p})`); // 改变按钮中value的值
    p--;
    window.setTimeout(() => phoneSecurityTime(o, p), 1000);
  }
}

const allobj = {
  // 显示加载中，a自定义内容，b自定义自动消失的时间
  sToast(a, b) {
    let $s = $('.all_stoast');
    if ($s.length <= 0) {
      $s = $(`<div class="all_stoast"><div><img src=${loading} alt="loading" />
      	<div class="t"></div></div></div>`);
      $('body').append($s);
    }

    if (a) {
      $s.find('.t').text(a);
    } else {
      $s.find('.t').text('请稍后…');
    }

    $s.fadeIn(300);
    if (b) {
      setTimeout(() => {
        $s.stop().fadeOut(300);
      }, b);
    }
  },
  // 隐藏加载中效果
  sToastHide() {
    const $s = $('.all_stoast');
    if ($s.length > 0) {
      $s.stop().fadeOut(300);
    }
  },
  // 将标准格式字符串进行日期格式化
  dateformart(str) {
    if (!str) { return ''; }
    let date = str;
    if (!(str instanceof Date)) {
      date = new Date(str);
    }
    let m = date.getMonth() + 1;
    let d = date.getDate();
    if (m < 10) { m = `0${m}`; }
    if (d < 10) { d = `0${d}`; }
    return `${date.getFullYear()}-${m}-${d}`;
  },
  // 将数字或字符串*100，保留两位小数点返回,非法返回''
  percent(str) {
    if (!str && str !== 0) { return ''; }
    const temp = window.parseFloat(str);
    return (temp * 100).toFixed(2);
  },
  // 将数字或字符串/100，保留两位小数点返回,非法返回''
  noPercent(str) {
    if (!str && str !== 0) { return ''; }
    const temp = window.parseFloat(str);
    return (temp / 100).toFixed(2);
  },
  // 保留4位小数点返回，非法返回''
  point4(str) {
    if (!str && str !== 0) { return ''; }
    const temp = window.parseFloat(str);
    return temp.toFixed(4) || '';
  },
  // 保留N位小数
  pointX(str, x = 0) {
    if (!str && str !== 0) { return '--'; }
    const temp = window.parseFloat(str);
    if (temp === 0) {
      return temp.toFixed(x);
    }
    return temp ? temp.toFixed(x) : '--';
  },
  // 去掉字符串两端空格
  trim(str) {
    const reg = /^\s*|\s*$/g;
    return str.replace(reg, '');
  },
  // 获取普通对象的属性总数
  getObjSize(obj) {
    if (typeof (obj) !== 'object') { return 0; }
    return Object.keys(obj).length;
  },
  // 获取验证码
  getMark(t, time1) {
    let time = time1;
    const $t = $(t);
    if (!$t.hasClass('marking')) {
      if (!time || time <= 0) { time = 60; }
      $t.addClass('marking');
      phoneSecurityTime($t, time);
      return true;
    }
    return false;
  },
  // 给字符串打马赛克
  addMosaic(str) {
    if (!str && str !== 0) {
      return '';
    }
    const s = `${str}`;
    const lenth = s.length;
    const howmuch = (() => {
      if (s.length <= 2) {
        return s.length;
      }
      const l = s.length - 2;
      if (l <= 6) { return l; }
      return 6;
    })();
    const start = Math.floor((lenth - howmuch) / 2);
    const ret = s.split('').map((v, i) => {
      if (i >= start && i < start + howmuch) {
        return '*';
      }
      return v;
    });
    console.log('组装：', ret);
    return ret.join('');
  },
  /* -- 表单验证初始化 -- */
  // 需要将容器div设置为class="locheck"
  // lo_int:必须为整数
  // lo_phone:正确的手机号码
  // lo_nonull:非空验证
  // lo_pwd:密码位数验证（非空6-18位）
  // lo_pwdr:密码重复验证
  // lo_checked:多选框或单选框是否已选中验证
  // lo_email:正确的邮箱
  // lo_yzm:两个验证码的值是否相同，需将正确验证码的值绑定到当前input上：data-yzm="正确验证码"
  // .lodiv(input组合容器,里面应该包括input,正确的提示，错误的提示)
  // .loisok(正确提示的容器)
  // .loisno(错误提示的容器)
  locheckInit() {
    const $lo = $('.locheck');
    $lo.find('.lo_int').on('keyup blur', function () { loint(this); });
    $lo.find('.lo_phone').on('keyup blur', function () { lophone(this); });
    $lo.find('.lo_nonull').on('keyup blur change', function () { lononull(this); });
    $lo.find('.lo_pwd').on('keyup blur', function () { lopwd(this); });
    $lo.find('.lo_pwdr').on('keyup blur', function () { lopwdr(this); });
    $lo.find('.lo_checked').on('change', function () { lochecked(this); });
    $lo.find('.lo_email').on('keyup blur', function () { loemail(this); });
    $lo.find('.lo_yzm').on('keyup blur', function () { loyzm(this); });
    $lo.find('.loisok,.loisno').addClass('all_none');
  },
  // 对当前整个locheck区域进行验证
  lobegincheck(t) {
    const $t = $(t);
    const $p = $t.parents('.locheck');
    $p.find('.lo_int,.lo_phone,.lo_nonull,.lo_pwd,.lo_pwdr,.lo_email,.lo_yzm').trigger('keyup');
    $p.find('.lo_checked').trigger('change');

    const $temp = $p.find('.lonopass');
    if ($temp.length <= 0) {
      return true;
    }
    return false;
  },
  /* 字符串加密 */
  compile(code) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    console.log('加谜：', code, c);
    return c;
  },
  /* 字符串解谜 */
  uncompile(code) {
    let c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    console.log('解谜：', code, c);
    return c;
  },
};

export default allobj;
