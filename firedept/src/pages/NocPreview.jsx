// import React, { useState, useRef } from 'react';
// import html2pdf from 'html2pdf.js';
// import { useNavigate } from 'react-router-dom';

// const NocPreview = () => {
//   const [showPreview, setShowPreview] = useState(null);
//   const pdfRef = useRef(); // <-- ADD THIS
//   const navigate = useNavigate();

//   // const handleDownloadPDF = () => {
//   //   const element = pdfRef.current;
//   //   const opt = {
//   //     margin: 0.5,
//   //     image: { type: 'jpeg', quality: 0.98 
        
//   //     },
//   //     html2canvas: { scale: 2 },
//   //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//   //   };

//   //   html2pdf().from(element).set(opt).outputPdf('blob').then((pdfBlob) => {
//   //     const blobUrl = URL.createObjectURL(pdfBlob);
//   //     const a = document.createElement('a');
//   //     a.href = blobUrl;
//   //     a.download = 'noc-certificate.pdf';
//   //     a.click();
//   //     setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
//   //   });
//   // };
//   const handleDownloadPDF = () => {
//   const element = pdfRef.current;
//   const opt = {
//     margin: 0.5,
//     filename: 'noc-certificate.pdf',
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//   };

//   html2pdf().set(opt).from(element).save();
// };


//   const tabButtons = [
//     {
//       key: 'send',
//       label: (
//         <>
//           <i className="bi bi-send me-2"></i>
//           Issue & Send
//         </>
//       ),
//       className: 'btn-dark text-white',
//       isRight: true,
//     },
//   ];

//   return (
//     <div className="container mt-4">
//       <div className="border p-4 rounded bg-white shadow">

//         <div className="d-flex justify-content-end mb-3"> {/* Moved buttons to right */}
//           <button className="btn btn-outline-secondary me-2" onClick={handleDownloadPDF}>
//             <i className="bi bi-download me-2"></i>Download PDF
//           </button>
//           {tabButtons
//             .filter(tab => tab.isRight)
//             .map((tab, index) => (
//               <button
//                 key={index}
//                 className={`btn ${tab.className} px-4 py-2 rounded`}
//                 onClick={() => setShowPreview(tab.key)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//         </div>

//         {/* Add ref here */}
//         <div ref={pdfRef}>
//           <div className="text-center border p-3 rounded mb-4">
//             <h4 className="fw-bold">FIRE SAFETY DEPARTMENT</h4>
//             <h5>NO OBJECTION CERTIFICATE</h5>
//             <button className="btn btn-dark mt-2 rounded-pill px-4 py-2">
//               Temporary NOC
//             </button>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <strong>NOC Number</strong>
//               <p>NOC-2023-001</p>
//               <strong>Building Name</strong>
//               <p>Not selected</p>
//               <strong>Building Address</strong>
//               <p>Not selected</p>
//               <strong>Building Owner</strong>
//               <p>Not selected</p>
//             </div>
//             <div className="col-md-6">
//               <strong>Building ID</strong>
//               <p>Not selected</p>
//               <strong>Issue Date</strong>
//               <p>May 18th, 2025</p>
//               <strong>Expiry Date</strong>
//               <p>May 18th, 2026</p>
//             </div>
//           </div>

//           <strong>Conditions</strong>
//           <ul>
//             <li>All fire safety equipment must be maintained in good working condition.</li>
//             <li>Fire drills must be conducted quarterly.</li>
//             <li>Fire safety plan must be displayed prominently.</li>
//             <li>Emergency exits must be kept clear at all times.</li>
//           </ul>

//           <div className="d-flex justify-content-between mt-4">
//             <div>
//               <strong>Issued By</strong>
//               <p>Fire Safety Officer</p>
//             </div>
//             <div className="text-end">
//               <strong>Digital Signature</strong>
//               <p><em>Digitally signed by Fire Safety Department</em></p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showPreview === 'Issue' && navigate('/issue')}
//     </div>
//   );
// };

// export default NocPreview;
import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';

const NocPreview = () => {
  const [showPreview, setShowPreview] = useState(null);
  const pdfRef = useRef();
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.5,
      filename: 'noc-certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  const tabButtons = [
    {
      key: 'send',
      label: (
        <>
          <i className="bi bi-send me-2"></i>
          Issue & Send
        </>
      ),
      className: 'btn-dark text-white',
      isRight: true,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="border p-4 rounded bg-white shadow">
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-secondary me-2" onClick={handleDownloadPDF}>
            <i className="bi bi-download me-2"></i>Download PDF
          </button>
          {tabButtons
            .filter((tab) => tab.isRight)
            .map((tab, index) => (
              <button
                key={index}
                className={`btn ${tab.className} px-4 py-2 rounded`}
                onClick={() => setShowPreview(tab.key)}
              >
                {tab.label}
              </button>
            ))}
        </div>

        <div ref={pdfRef}>
          <div className="text-center border p-3 rounded mb-4">
            <h4 className="fw-bold">FIRE SAFETY DEPARTMENT</h4>
            <h5>NO OBJECTION CERTIFICATE</h5>
            <button className="btn btn-dark mt-2 rounded-pill px-4 py-2">
              Temporary NOC
            </button>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>NOC Number</strong>
              <p>NOC-2023-001</p>
              <strong>Building Name</strong>
              <p>Not selected</p>
              <strong>Building Address</strong>
              <p>Not selected</p>
              <strong>Building Owner</strong>
              <p>Not selected</p>
            </div>
            <div className="col-md-6">
              <strong>Building ID</strong>
              <p>Not selected</p>
              <strong>Issue Date</strong>
              <p>May 18th, 2025</p>
              <strong>Expiry Date</strong>
              <p>May 18th, 2026</p>
            </div>
          </div>

          <strong>Conditions</strong>
          <ul>
            <li>All fire safety equipment must be maintained in good working condition.</li>
            <li>Fire drills must be conducted quarterly.</li>
            <li>Fire safety plan must be displayed prominently.</li>
            <li>Emergency exits must be kept clear at all times.</li>
          </ul>

          <div className="d-flex justify-content-between mt-4">
            <div>
              <strong>Issued By</strong>
              <p>Fire Safety Officer</p>
            </div>
            <div className="text-end">
              <strong>Digital Signature</strong>
              <p><em>Digitally signed by Fire Safety Department</em></p>
            </div>
          </div>
        </div>
      </div>

      {showPreview === 'Issue' && navigate('/issue')}
    </div>
  );
};

export default NocPreview;
