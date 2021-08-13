import { Tooltip, Typography } from "@material-ui/core";
import React, { createRef } from "react";
import styled from 'styled-components';
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./styles.css";

const orgChart = {
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

export default function App() {
  const [translate, containerRef] = useCenteredTree();
  const wrapper = createRef();
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={orgChart}
        collapsible={true}
        enableLegacyTransitions={true}
        orientation="horizontal"
        depthFactor="250"
        shouldCollapseNeighborNodes={false}
        translate={translate}
        renderCustomNodeElement={(props) =>
          renderNodeWithCustomEvents({ ...props, wrapper })
        }
      />
    </div>
  );
}

const Route = styled.div`
  width: 120px;
  height: 42px;
  border: solid 1px #111;
`