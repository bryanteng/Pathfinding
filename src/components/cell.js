import React from 'react'

const Cell= ({loc, block, start, end, classN, onClick}) =>{
    if(block){
      if(block == "O"){
        classN = "path"
      }else if(block == "x"){
        classN = "closed"
      }else if(block == "W"){
         classN = "bar"
      }else if (block == "S" || block == "E"){
        // classN = "node"
      }
    }
    return(
      <td className={classN ? classN: null} key={loc} loc={loc} onClick={onClick}>{block}</td>
    )
  }

export default Cell
