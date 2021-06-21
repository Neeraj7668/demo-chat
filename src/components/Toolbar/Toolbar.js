import React, { useEffect, useState } from "react";
import "./Tollbar.css";
import "./Menu.css";
import $ from "jquery";
function Toolbar() {
  // $("[contenteditable]").on("keypress focusout", function (ev) {
  //   var node = window.getSelection().getRangeAt(0).commonAncestorContainer;
  //   var nodeParent = node.parentNode;

  //   // Do something if parent node ID is "p1"
  //   if (nodeParent.id === "p1") {
  //     console.log(nodeParent.id + " " + ev.type); // or whatever you need to do here
  //   }
  // });
  const [edit, setEdit] = useState(false)
   const test = () => {
    // alert("focusout");
    console.log("focusout")
  };
    useEffect(() => {
      $("[contenteditable]").on("focusout", function (ev) {
        var node = window.getSelection().getRangeAt(0).commonAncestorContainer;
        var nodeParent = node.parentNode;

        // Do something if parent node ID is "p1"
        if (nodeParent.id === "p1" || nodeParent.id === "p2" ) {
          test() // or whatever you need to do here
        }
      });
    },[]);
 

  return (
    <div className="mt-5" onClick={()=>setEdit(true)}>
      <div contenteditable={edit} >
        <p id="p1">TestP1 do someting on keypress getSelection</p>       
      </div>

       <div contenteditable="true">
        <p id="p1">TestP2 do someting on keypress getSelection</p>       
      </div>
     
    </div>
  );
}

export default Toolbar;
