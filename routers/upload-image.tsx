import React from 'react'
import {DropArea,WrapperBox,Label,BasePropertyProps,} from 'admin-bro'
const Edit:React.FC<BasePropertyProps>=(props)=>{
    const {property,onChange}=props
    const handledropareachange=(files)=>{
      onChange(property.name,files[0]) 
    }
    return (
        <WrapperBox>
            <Label>Upload profile Photo</Label>
            <DropArea onUpload={handledropareachange}/>
        </WrapperBox>
    )
}
export default Edit