import React from 'react';
import './dock.scss';

const data = [
  { name: '画笔', icon: 'pen', value: 'pen' },
  { name: '图片', icon: 'picture', value: 'picture' },
  { name: '橡皮', icon: 'eraser', value: 'eraser' },
  { name: '套索', icon: 'lasso', value: 'lasso' },
  {
    name: '颜色',
    icon: 'color',
    value: 'color',
    children: [
      { name: 'red', icon: 'red', value: 'red' },
      { name: 'blue', icon: 'blue', value: 'blue' },
      { name: 'green', icon: 'green', value: 'green' },
    ],
  },
];

interface Props {
  data:{name:string, icon:string}[];
  className: string;
}

function List({ data, className }:Props) {
  return (
    <div className={className}>
      {
        data.map(
          (cur:{name:string, icon:string}) => (
            <button
              key={cur.name}
              type="button"
              onClick={(...e) => { console.log(e, cur.name); }}
            >
              <i className={`iconfont icon-${cur.icon}`} />
            </button>
          ),
        )
      }
    </div>
  );
}

function Dock() {
  return (<List className="dock" data={data} />);
}

export default Dock;
