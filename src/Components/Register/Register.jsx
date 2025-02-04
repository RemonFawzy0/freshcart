import { useFormik, validateYupSchema } from 'formik'
import React from 'react'
import * as Yup from "yup"
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'




export default function Register() {

   const [isloding, setisloding] = useState(false)
   const [errormessage,seterrormessage] = useState("")
   const navigate = useNavigate()




  const validationSchema = Yup.object({
    name: Yup.string().min(3,'Name minimum length is 3').max(10,'Name maximum length is 10').required('Name is Required'),
    email: Yup.string().required('email is Required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Email is Required') ,
    password: Yup.string().required('password is Required').matches(/^[A-Za-z]{6,9}[A-Z|a-z0-9]{0,9}$/,' must be 1-Start with a letter (either uppercase or lowercase).  2- Be between 6 and 9 characters in total. 3- Can only contain letters (A-Z or a-z) and numbers (0-9)'),
    rePassword: Yup.string().required('rePassword is Required').oneOf([Yup.ref("password")] ,"password and repassword must be matched" ),
    phone: Yup.string().required('phone is Required').matches(/^01[0125][0-9]{8}$/, ' invalid Phone')

  })



  const formik = useFormik({
    initialValues:{
        
            "name": "",
            "email":"",
            "password":"",
            "rePassword":"",
            "phone":"",
        
    },
    onSubmit:register,
    validationSchema: validationSchema
  })


  function register(){
    setisloding(true);
    seterrormessage("")
  
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",formik.values )
    .then((response)=>{
      setisloding(false);
      navigate("/login")
      console.log(response.data.message);
    }).catch((error) =>{
      setisloding(false);
      seterrormessage(error.response.data.message)
      console.log(error.response.data.message);
    })
  
  }





  return <>
  <h1 className="mb-7">Register Now</h1>
  <form  onSubmit={formik.handleSubmit}>
   <div>
  <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
      Name :
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="name"
          id="Name"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Name" />
          {formik.errors.name &&formik.touched.name &&<p className= 'bg-red-400 text-white p-2 rounded-md my-2'>{formik.errors.name}</p>}
          </div>
</div>  
<div>
      <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">
      Email :
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          name="email"
          id="Email"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Email" />
           {formik.errors.email &&formik.touched.email &&<p className= 'bg-red-400 text-white p-2 rounded-md my-2'>{formik.errors.email}</p>}
          </div>
</div>  
<div>
      <label htmlFor="Password" className="block text-sm font-medium leading-6 text-gray-900">
      Password :
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="Password"
          name="password"
          id="Password"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Password" />
           {formik.errors.password &&formik.touched.password &&<p className= 'bg-red-400 text-white p-2 rounded-md my-2'>{formik.errors.password}</p>}
          </div>
</div>  
<div>
      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
      Re-password :
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="Password"
          name="rePassword"
          id="password"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=" Re-password" />
           {formik.errors.rePassword &&formik.touched.rePassword &&<p className= 'bg-red-400 text-white p-2 rounded-md my-2'>{formik.errors.rePassword}</p>}
          </div>
</div>  
<div>
      <label htmlFor="Phone" className="block text-sm font-medium leading-6 text-gray-900">
      Phone :
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="tel"
          name="phone"
          id="Phone"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Phone" />
           {formik.errors.phone &&formik.touched.phone &&<p className= 'bg-red-400 text-white p-2 rounded-md my-2'>{formik.errors.phone}</p>}
          </div>
          {errormessage && <div className="div">
           <p className= 'bg-red-400 text-white p-2 rounded-md my-2'>{errormessage}</p>
          </div>}
          <button disabled={isloding} type='submit' className="text-white ms-auto block bg-green-500 p-2 my-10 rounded-lg">
           {isloding?<i className='fas fa-spinner fa-spin mx-5 '></i>:<span>Register Now</span>}
            
            </button>
     </div> 
    </form> 
  
  </>
}
