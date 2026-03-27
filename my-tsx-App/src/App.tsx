import { useEffect, useState } from 'react'






function App() {
  const [allAdmin, setAllAdmin] = useState([])

  useEffect(()=>{

    const data= [
      {
        name:"Raj",
        email:"Raj@gmail.com",
        phone:"53456565665",
        isActive:true

      },
       {
        name:"Dev",
        email:"Dev@gmail.com",
        phone:"98776565665",
        isActive:false

      },
       {
        name:"jaynesh",
        email:"jaynesh@gmail.com",
        phone:"897656565665",
        isActive:true

      },
       {
        name:"milan",
        email:"mialn@gmail.com",
        phone:"879665677766",
        isActive:false

      }
    ];
    
    setAllAdmin(data);

  },[])
  

  return  <>

  <table border={1}>
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      {
       allAdmin.map((item, index) => {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.isActive?"active":"inactive"}</td>
    </tr> 
  )
})
      }
      
    </tbody>
  </table>
   
    
    </>
  
}

export default App
