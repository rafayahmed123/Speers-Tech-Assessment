import React, { useState, useEffect } from 'react';
import { BiPhoneIncoming } from "react-icons/bi";

const Info = (props) => {

const x = props.map()
return(
<div style={{display: 'flex', flexDirection: 'column',width: '100%', height: '100%', justifyContent: 'center',alignItems:'center'}}>
    {x}
</div>
    

)

}

export default Info;