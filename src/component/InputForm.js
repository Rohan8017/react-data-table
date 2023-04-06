import React from 'react'

export default function inputform(props) {
    const {label,...others}=props;
  return (
    <div className='forminput-input'>
        <label>{label}</label>
        <input {...others}/>
    </div>
  )
}
