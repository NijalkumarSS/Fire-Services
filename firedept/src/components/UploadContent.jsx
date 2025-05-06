import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UploadContent = () => {

    const[content,setcontent] = useState([
        {head :'Compliance with Regulations:',content:'Many jurisdictions require a Fire NOC for certain types of buildings or businesses, making it a legal requirement. ' },
        {head :'Ensuring Safety:',content:'The NOC verifies that a building is equipped with fire safety products, including fire extinguishers, alarms, sprinklers, and smoke detectors. ' },
        {head :'Risk Mitigation',content:'By ensuring adherence to fire safety standards, a Fire NOC helps prevent potential fire hazards and ensures preparedness. ' },
        {head :'Protection of Occupants:',content:'The NOC helps protect the safety and well-being of people within the premises, as well as neighboring structures and the community. ' },
        {head :'Documentation of Compliance:',content:'The NOC serves as proof that a building meets fire safety regulations, providing assurance to authorities and insurance companies' },
        {head :'Insurance Claim:',content:'Obtaining a Fire NOC can be essential for processing an insurance claim in case of a fire, as it demonstrates compliance with safety regulations. ' }
    ])

    const[content2,setcontent2] = useState([
        {head:'Safe Business:',content:'Registering for a Fire License ensures that your business is equipped with the necessary safety measures as mandated by the government. This provides a safer environment for your employees and customers.'},
        {head:'Legal Right: ',content:'Operating a business with a legally approved Fire License holder gives you the right to claim legal remedies in case of any issues or disputes arising from fire incidents. This can help safeguard your business and reputation in the long run.'},
        {head:'Legal compliance:',content:' Obtaining a fire license ensures your business or organization complies with local fire safety regulations. This can help you avoid legal consequences, such as fines or imprisonment that may result from non-compliance.'},
        {head:'Fire safety: ',content:'Obtaining a fire safety certificate involves a fire safety assessment of your workplace. This helps to identify potential fire hazards and implement safety measures to prevent fires and protect your employees and property.'},
        {head:'Insurance benefits:',content:'Some providers may offer premiums discounts for businesses with a fire license. Additionally, having a fire license can help to expedite the insurance claim process in case of fire damage.'} 
    ])
  return (
    <>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-12'>
               <div className='m-3'>
               <header className=" py-4 mb-4 border-bottom">
                    <div className="container text-center">
                        <h1 className="mb-2 textstyle" style={{ fontSize: '2.5rem', color: '#333' }}>
                            Fire NOC Information Portal
                        </h1>
                        <p className="mb-0" style={{ fontSize: '1.2rem', color: '#666' }}>
                        Ensuring Safety Through Compliance and Certification
                        </p>
                    </div>
                   
                </header>
                
                    <p>Obtaining a Fire NOC (No Objection Certificate) is a crucial step for property owners and businesses in Chennai to ensure safety compliance with fire safety regulations. Whether you’re constructing a new building, starting a business, or seeking to renew your license, having a Fire NOC is mandatory for certain types of properties. In this blog, we will delve into the importance of the Fire NOC and license 
                        provide you with a comprehensive checklist of the documents required to obtain it.</p>

                    <h4 className='mb-3 mt-4'>What is Fire NOC ?</h4>
                    <p>A Fire NOC, or No Objection Certificate for fire safety, is an essential document issued by a city or state fire department. 
                        It certifies that a building, establishment, or facility has been inspected and found to comply with the local fire authority's
                         fire safety norms and standards. The purpose of a Fire NOC is to ensure that the building has adequate fire safety measures 
                         in place to protect the occupants and property from the risk of fire. Obtaining a Fire NOC involves a thorough inspection by
                          fire safety officers, who evaluate the premises for proper fire extinguishing systems, alarm systems, safe electrical installations,
                           and adequate escape routes in case of a fire. This certificate is typically required for high-rise buildings, 
                        hotels, hospitals, schools, malls, and other public spaces where the fire risk could have severe consequences.</p>
                    
                    <h4 className='mb-3 mt-4'>What is a <span className='text-warning'>Fire NOC</span> is important?</h4
                    
                    >
                    <p>A Fire No Objection Certificate (NOC), also known as a Fire Safety Certificate, is crucial for fire safety because it ensures 
                        that a building or establishment meets fire safety regulations and standards. Obtaining an NOC verifies that the premises are 
                        equipped with necessary safety features like fire extinguishers, alarms, and sprinkler systems, and have proper evacuation plans.
                         This certification demonstrates a commitment to fire safety and compliance with local regulations. </p>
               
                    {content.map((item,index) => (
                        <div key={index}>
                            <h6>{item.head}</h6>
                            <p>{item.content}</p>
                        </div>
                    ))}

                    <h4 className='mt-4 mb-3'>What is Fire License?</h4>
                    <p>A Fire License, on the other hand, is a permit that allows a business to carry out inherently risky activities regarding fire safety. This license is issued after assessing the activities' nature and potential fire hazards. Businesses that involve the use of highly flammable materials, such as fireworks manufacturers, certain types of chemical factories, and businesses using large industrial ovens, are examples of entities that typically require a Fire License. To obtain a Fire License, a business must submit detailed plans of its operational processes, materials used, and fire safety measures. The fire department reviews these plans to ensure all potential fire risks are adequately mitigated before issuing the license.</p>
                    
                    <h4>Why <span className='text-warning'>Fire License</span> is important?</h4>
                    <p>A fire license is important in fire safety because it verifies that a building or establishment has implemented the necessary fire safety measures to protect occupants and minimize the risk of fire incidents. It ensures legal compliance with fire safety regulations, promotes public safety, and encourages the development of emergency response plans. </p>
                    {content2.map((item,index) => (
                        <div key={index}>
                            <h6>{item.head}</h6>
                            <p>{item.content}</p>
                        </div>
                    ))}
                     <footer className=" py-3 border-top mt-5">
                        <div className="container text-center">
                            <p className="mb-1" style={{ fontSize: '1rem', color: '#666' }}>
                                © 2025 Fire Safety Authority. All rights reserved.
                            </p>
                        </div>
                    </footer>
                    <div>

                    </div>
               </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default UploadContent