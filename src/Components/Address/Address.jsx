import React from 'react'
import { useParams } from 'react-router-dom'
import { useFormik, validateYupSchema } from 'formik'
import * as Yup from "yup"
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Address() {

 let {cartId} = useParams()



   const [isloding, setisloding] = useState(false)
   const [errormessage,seterrormessage] = useState("")
   const navigate = useNavigate()




  const validationSchema = Yup.object({
    details: Yup.string().min(3,'details minimum length is 3').max(10,'details maximum length is 10').required('details is Required'),
    city: Yup.string().min(3,'city minimum length is 3').max(10,'city maximum length is 10').required('city is Required'),
    phone: Yup.string().required('phone is Required').matches(/^01[0125][0-9]{8}$/, ' invalid Phone')

  })



  const formik = useFormik({
    initialValues:{
        
            "details": "",
            "city":"",
            "phone":"",
        
    },
    onSubmit:register,
    validationSchema: validationSchema
  })


  function register(){
    setisloding(true);
    seterrormessage("")
    CheckOut(formik.values)
   
  }

  async function CheckOut(address){
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
      "shippingAddress": address
    },{
      params:{
        url:"http://localhost:5173"
      },
      headers:{
        token:localStorage.getItem("token")
      }
    })
    setisloding(false)
    open(data.session.url, '_self')
  }



  return <>
  <h1 className="mb-7">Check Outw</h1>
  <form  onSubmit={formik.handleSubmit}>
   <div>
  <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
  Details :
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="details"
          id="details"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="details" />
          {formik.errors.details &&formik.touched.details &&<p className= 'bg-red-400 text-white p-2 rounded-md my-2'>{formik.errors.details}</p>}
          </div>
</div>  
<div>
  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
  City :
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="city"
          id="city"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="city" />
          {formik.errors.city &&formik.touched.city &&<p className= 'bg-red-400 text-white p-2 rounded-md my-2'>{formik.errors.city}</p>}
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
           {isloding?<i className='fas fa-spinner fa-spin mx-5 '></i>:<span>Check Out</span>}
            
            </button>
     </div> 
    </form> 
  
  </>
}
