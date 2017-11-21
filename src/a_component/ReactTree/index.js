/* 通用tree组件 还没写完 请无视 */
import React from 'react';
import { Tree, Input } from 'antd';
import _ from 'lodash';
import P from 'prop-types';
import './index.scss';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
class RT extends React.Component {

  /**
    原始数据(扁平数据)转层级数据
    data: 原始数组
    now: 当前检测的数组元素
  */
  static _sourceDataToHierData(data, now = {}) {
    const t = now ? now : {};
    const temp = [];
    for(let j=0; j<data.length; j++) {
      if ((!data[j].pid && data[j].pid !==0 && !t.id) || data[j].pid === t.id) {
        temp.push(data[j]);
        const j_son = RT._sourceDataToHierData(data, data[j]);
        data[j].children = j_son.length ? j_son : null;
      }
    }
    return temp;
  }

  /**
    原始数据(层级数据)转扁平数据
    data: 当前检测项的children字段
    now: 返回数组
  */
  static _hierDataToSourceData(data, pid = null) {
    let arr = [];
    for(let i=0; i<data.length; i++) {
      data[i].pid = pid;
      arr.push(data[i]);
      if (Array.isArray(data[i].children) && data[i].children.length > 0) {
        const temp = RT._hierDataToSourceData(data[i].children, data[i].id);
        delete data[i].children;
        arr = arr.concat(temp);
      }
    }
    return arr;
  }

  /** 检查一个值是否包含在一个数组中 **/
  static _checkValueInArr(value = null, arr = []) {
    return arr.some((item) => item.toString() === value.toString());
  }

  /** 将数组中所有成员全部转为string **/
  static _toStringArr(arr) {
    return arr.map((item) => String(item));
  }

  /**
   * 通过key找对应的详细信息对象
   * key: 要查找的key
   * arr: 扁平原始数据数组
   * **/
  static _findByKey(key, arr) {
    return arr.find((item) => {
      return `${item.id}` === `${key}`;
    });
  }

  /** 类的构造函数 **/
  constructor(props) {
    super(props);
    this.state = {
      flatData: [], // 扁平数据
      hierData: [], // 层级数据
      treeDom: [],  // 缓存树结构
      chosedKeys: [],   // 当前选中的所有key
      search: '',   //
    };
  }

  /** 组件初始化挂载之前触发 **/
  componentWillMount() {
    console.log('初始化挂载之前');
    const hierData = this.props.dataIsCascade ? this.props.data : RT._sourceDataToHierData(_.cloneDeep(this.props.data));
    const flatData = this.props.dataIsCascade ? RT._hierDataToSourceData(_.cloneDeep(this.props.data)) : this.props.data;
    const treeDom = this.makeTreeDom(hierData);
    const chosedKeys = this.props.defaultChecked ? this.props.defaultChecked.map((item) => item.toString()) : [];
    this.setState({
      hierData,
      flatData,
      treeDom,
      chosedKeys,
    });
    console.log('T是什么：', hierData, flatData);
  }

  /** 组件初始化完毕时触发 **/
  componentDidMount() {
   
  }

  /** 组件参数改变 **/
  componentWillReceiveProps(nextP, nextS) {
    console.log('改变了：', nextP, nextS);
    if (nextP.data !== this.props.data) {
      const hierData = this.props.dataIsCascade ? nextP.data : RT._sourceDataToHierData(_.cloneDeep(nextP.data));
      const flatData = this.props.dataIsCascade ? RT._hierDataToSourceData(_.cloneDeep(this.props.data)) : this.props.data;
      const treeDom = this.makeTreeDom(hierData);
      console.log('T是什么：', hierData, flatData);
      this.setState({
        hierData,
        flatData,
        treeDom
      });
    } else if (nextP.defaultChecked !== this.props.defaultChecked) {
      this.setState({
        chosedKeys: Array.from(new Set(RT._toStringArr([...nextS.chosedKeys, ...nextP.defaultChecked]))),
      });
    }
  }

  // 返回当前所有选中的项
  onOk() {
    const result = [];
    this.state.chosedKeys.forEach((item) =>{
        const temp = RT._findByKey(item, this.state.flatData);
        if (temp) {
          result.push(temp);
        }
    });
    this.props.onOk(result, this.state.chosedKeys);
  }

  // 点选复选框时触发
  onCheck(keys, e) {
    console.log('选的什么：', keys, e);
    this.setState({
      chosedKeys: keys,
    });
  }

  // 模糊搜索
  onSearch(value) {
    this.setState({

    });
  }

  // 根据层级数据生成Tree结构
  makeTreeDom(data, thekey) {
    const arr = [];
    for (let i=0; i<data.length; i++) {
      const item = data[i];
      const nowkey = thekey ? `${thekey}-${i}` : '0';
      if (RT._checkValueInArr(item.id, this.props.defaultHide)) { // 默认需要隐藏的，直接跳过
        continue;
      }

      let children;
      if (Array.isArray(item.children) && item.children.length > 0) { // 如果有children，继续深入一层
        children = this.makeTreeDom(item.children);
        if (children.length > 0) {
          arr.push(
            <TreeNode
              title={item.title}
              key={`${item.id}`}
              thekey={nowkey}
              data={item}
              disabled={RT._checkValueInArr(item.id, this.props.defaultDisabled)}
            >
              { children }
            </TreeNode>
          );
        }
      }
      if (!children || children.length === 0) {
        arr.push(
          <TreeNode
            title={item.title}
            key={`${item.id}`}
            thekey={nowkey}
            data={item}
            disabled={RT._checkValueInArr(item.id, this.props.defaultDisabled)}
          />
        );
      } 
    }
    return arr;
  }

  render() {
    return (
      <div className={this.props.checkable && this.props.lengthen ? 'react-antd-tree lengthen' : 'react-antd-tree'}>
        <Search
            placeholder="模糊搜索"
            style={{ width: 200 }}
            onSearch={(value) => this.onSearch(value)}
        />
        <Tree
          checkable={this.props.checkable}
          checkedKeys={this.state.chosedKeys}
          onCheck={(keys, e) => this.onCheck(keys, e)}
          filterTreeNode={(node) => {
            return node.props.data.title.indexOf('0') > -1;
          }}
        >
          {this.state.treeDom}
        </Tree>
        <button onClick={() => this.onOk()}>确定</button>
      </div>
    );
  }
}

RT.propTypes = {
  id: P.any,                // ID
  data: P.array,            // 原始数据,[{id,title,pid,sort(可选)},...]
  dataIsCascade: P.bool,    // 传入的数据是否是已处理好的层叠数据,如果是就不用再处理了
  checkable: P.bool,        // 是否为多选
  lengthen: P.bool,         // 是否把checkable的范围加宽（checkable为true时有效）
  defaultChecked: P.array,  // 需要被默认选中的项（checkable为true时有效）,[1,2,...]
  defaultDisabled: P.array, // 需要被禁用的项,[1,2...]
  defaultHide: P.array,     // 需要排除的项（不会被加入到TreeDom中）,[1,2...]
  onOk: P.func,             // 选择确定回调，返回所有被选中的项
};

export default RT;
