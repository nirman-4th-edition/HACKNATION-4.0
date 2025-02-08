import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './BC_About.css';

export default function BC_About() {
  React.useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="about-breast-cancer">
      <div className="text-section" data-aos="fade-right">
        <h2>About Breast Cancer</h2>
<p>Breast cancer is a disease in which cells in the breast grow uncontrollably. These cells form a tumor that can be felt as a lump or seen on an X-ray. If left untreated, breast cancer cells can spread to other parts of the body.</p>
<h2>Risk Factors</h2>
<p>Several risk factors can increase the likelihood of developing breast cancer. These include a family history of breast cancer, genetic mutations (such as BRCA1 and BRCA2), aging, radiation exposure, obesity, and alcohol consumption. However, having one or more risk factors does not guarantee that a person will develop the disease.</p>
<h2>Symptoms</h2>
<p>Common symptoms of breast cancer include a lump in the breast or armpit, changes in breast size or shape, dimpling of the skin, nipple discharge, or pain in the breast. Regular self-examinations and mammograms are crucial for early detection.</p>
<h2>Diagnosis</h2>
<p>Breast cancer is typically diagnosed through a combination of physical exams, imaging tests (such as mammograms or ultrasounds), and biopsies. Early detection is key to improving survival rates and treatment outcomes.</p>    
{/* <h2>Treatment Options</h2>
<p>Treatment for breast cancer varies based on the stage and type of cancer. Common treatments include surgery, radiation therapy, chemotherapy, hormone therapy, and targeted therapy. Each treatment plan is personalized to best meet the needs of the patient.</p> */}


</div>
      <div className="image-section" data-aos="fade-left">
        <img src="./cause.jpg" alt="Cause"  style={{height:"700px"}}/>
        <img src="" alt="" />
      </div>
    </div>
  );
}
