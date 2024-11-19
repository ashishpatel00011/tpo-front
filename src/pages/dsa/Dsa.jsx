import "./dsa.css";
import React from 'react';
import Array from "./array";
import Binery from "./binery";
import Math from "./math";
import Logic from "./logic";
import String from "./string";
import Sorting from "./sorting";
import LinkedList from "./linkedlist";
import StackQueue from "./stackQueue";
import Bits from "./bits";

import DpGraph from "./dp_graph";
const Dsa = (token) => {

  return (
    <>
      <div class="blind-description">
        <p>
          <strong>A2Z Placement DSA Sheet</strong>
        </p>
        <div class="desc">
          This DSA Sheet is designed to help you ace coding interviews by providing a comprehensive guide to mastering Data Structures and Algorithms (DSA). Whether you're preparing for placements, internships, or technical rounds at top tech companies, this sheet will guide you through the most important topics, concepts, and problems.
        </div>
      </div>
      <div className="box">
        <Logic />
        <Math />
        <Sorting />
        <Array />
        <Binery />
        <String />
        <Bits/>
        <LinkedList />
        <StackQueue/>
        <DpGraph />
      </div>
    </>
  );
};

export default Dsa;
