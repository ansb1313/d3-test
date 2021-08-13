import { Tooltip, Typography } from "@material-ui/core";
import React, { createRef, useState } from "react";
import styled from 'styled-components';
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./styles.css";

import {stratify, Node, hierarchy} from "d3-hierarchy";
import path from "d3-hierarchy/src/hierarchy/path";




const initialTreeData = {
  name: "Master Richtung Maschinenbau und Wirtschaft",
  children: [
    {
      name: "Energie- und Verfahrenstechnik",
      children: [
        {
          name: "Pflichtfächer",
          children: [
            {
              name: "Einführung in die Wirtschaftspolitik"
            },
            {
              name: "Industrieökonomik"
            },
            {
              name: "Nanotechnologie für Maschinenbauer und Verfahrenstechniker"
            },
            {
              name: "Thermische Verfahrens- und Prozesstechnik"
            },
            {
              name: "Übung zu Industrieökonomik"
            },
            {
              name: "Verbrennungsmotoren"
            }
          ]
        },
      ]
    },
  ]
};

const containerStyles = {
  width: "100vw",
  height: "100vh"
};

const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode, wrapper }) => {
  // Horizontal orientation
  let y = 15;
  let x = -15;
  let output = "";
  let nodeNameArray = nodeDatum.name.split(" ");
  return (
    <g ref={wrapper}>
      <Tooltip
        title={<Typography>{nodeDatum.name}</Typography>}
        arrow
        placement="right"
      >
        <circle
          r="20"
          onClick={
            nodeDatum.children
              ? toggleNode
              : ""
          }
        />
      </Tooltip>

      {nodeNameArray.length === 1 ? (
        <text
          fill="black"
          strokeWidth="1"
          x={x.toString()}
          y={(y + 20).toString()}
        >
          {nodeDatum.name}
        </text>
      ) : (
        nodeNameArray.map((name, index) => {
          if ((index + 1) % 2 === 0) {
            y = y + 20;
            output = nodeNameArray[index - 1] + " " + nodeNameArray[index];
            return (
              <text
                key={index}
                fill="black"
                strokeWidth="1"
                x={x.toString()}
                y={y.toString()}
              >
                {output}
              </text>
            );
          } else if (
            (index + 1) % 2 !== 0 &&
            index + 1 === nodeNameArray.length
          ) {
            y = y + 20;
            return (
              <text
                key={index}
                fill="black"
                strokeWidth="1"
                x={x.toString()}
                y={y.toString()}
              >
                {name}
              </text>
            );
          } else return "";
        })
      )}
    </g>
  );
};

const array = [1, 3, 6, 2, 5]
    const sum = array.reduce((acc, i) => {
        return acc + i;
    }, 0)
    console.log(sum) // 17
    
    // const obj = hierarchy(treeData);
    
    

    const stData = {
        name:'top',
        children:[

        ]
    }
    const children = [
        {
            name:'level 1',
            children:[
                {
                    name:'level 2',

                    children:[
                        {
                            name:'level 3'
                        }
                    ]
                }
            ]
        }
    ]

    const findPath = (ob, key, value) => {
        const path = [];
        const keyExists = (obj) => {
            if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
                return false;
            }
            else if (obj.hasOwnProperty(key) && obj[key] === value) {
                return true;
            }
            else if (Array.isArray(obj)) {
                let parentKey = path.length ? path.pop() : "";

                for (let i = 0; i < obj.length; i++) {
                    path.push(`${parentKey}[${i}]`);
                    const result = keyExists(obj[i], key);
                    if (result) {
                        return result;
                    }
                    path.pop();
                }
            }
            else {
                for (const k in obj) {
                    path.push(k);
                    const result = keyExists(obj[k], key);
                    if (result) {
                        return result;
                    }
                    path.pop();
                }
            }

            return false;
        };

        keyExists(ob);

        return path.join(".");
    }

    // const level5 = findPath(treeData, "name", "level 5"); // key 고정, value는 클릭으로 선택된 아이템의 name

    Object.byString = function(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        let a = s.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            let k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    };

    // const tData = level5.split("")
    // tData.splice(-3);
    // const newData = tData.join("")

    // console.log('newData',newData)
    // console.log('obj',Object.byString(treeData, newData)) // 해당 루트의 원본데이터를 가져와줌

    // const getObj = Object.byString(treeData, newData);

    // getObj.push({name:'level 5 2'}); // 원본 데이터에 루트를 추가하거나
    // getObj.push({children:[]}); // children 을 추가


    // console.log('treeData',treeData)

function onNodeClick(node, treeData) {
  console.log(node);
  const nodePath = findPath(treeData, "name", node.name); // key 고정, value는 클릭으로 선택된 아이템의 name
  console.log(nodePath);
  const tData = nodePath.split("")
  tData.splice(-3);
  const newData = tData.join("")
  const getObj = Object.byString(treeData, newData);
  // getObj.push({name: 'watch me while I make it out'});
  getObj.push({children: []});
  console.log(getObj);
  console.log(treeData);
}

export default function App() {
  const [translate, containerRef] = useCenteredTree();
  const wrapper = createRef();
  const [treeData, setTreeData] = useState(initialTreeData)

  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={treeData}
        collapsible={true}
        enableLegacyTransitions={true}
        orientation="horizontal"
        depthFactor="250"
        shouldCollapseNeighborNodes={false}
        translate={translate}
        onNodeClick={(node) => {onNodeClick(node, treeData)}}
        // renderCustomNodeElement={(props) =>
        //   renderNodeWithCustomEvents({ ...props, wrapper })
        // }
      />
    </div>
  );
}

const Route = styled.div`
  width: 120px;
  height: 42px;
  border: solid 1px #111;
`