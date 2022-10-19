import React, { Component } from "react";
import "./SortingViz.css";
import { getBubbleSort } from "../SortingAlgos/bubble";
import { getMergeSort } from "../SortingAlgos/mergeSort";

const ANIMATION_SPEED = 2;
const PRIMARY_COLOR = "#79bcad";
const SECONDARY_COLOR = "#d33d3d";
const FINAL_COLOR = "#337c43";

export default class SortingViz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      diff: 0,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    let array = [];
    for (let i = 0; i < 188; i++) {
      array.push(randomInt(100, 500));
    }
    this.setState({ array, diff: 0 });
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  }

  bubbleSort() {
    let [animations] = getBubbleSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex, isSorted] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          if (isSorted === true) {
            barTwoStyle.backgroundColor = FINAL_COLOR;
          }
        }, i * ANIMATION_SPEED);
      } else {
        const [barIdx, newHeight] = animations[i];
        if (barIdx === -1) {
          continue;
        }
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  }

  mergeSort() {
    let animations = getMergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 === 0 || i % 3 === 1;
      if (isColorChange) {
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex, isMerging] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          if (!isMerging) {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight, isMerging] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
          if (isMerging === true) {
            barStyle.backgroundColor = FINAL_COLOR;
          }
        }, i * ANIMATION_SPEED);
      }
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div className="root">
        <h1>SORTING VISUALISER</h1>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <button onClick={() => this.resetArray()} style={{ marginLeft: "5px" }}>
          Generate
        </button>
        <button onClick={() => this.bubbleSort()} style={{ marginLeft: "5px" }}>
          Bubble Sort
        </button>
        <button onClick={() => this.mergeSort()} style={{ marginLeft: "5px" }}>
          Merge Sort
        </button>
      </div>
    );
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
