import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './PD_About.css';

export default function PD_About() {
  React.useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="about-parkinsons-disease">
      <div className="text-section" data-aos="fade-right">
        <h2>About Parkinson's Disease</h2>
        <p>
          Parkinson’s Disease is a progressive neurological disorder that primarily affects movement and coordination. It occurs due to the gradual loss of dopamine-producing neurons in the brain, especially in a region known as the substantia nigra.
        </p>

        <h2>Risk Factors</h2>
        <ul>
          <li><strong>Loss of Dopamine:</strong> Dopamine is a neurotransmitter essential for controlling movement and coordination.</li>
          <li><strong>Genetic Factors:</strong> Some cases have a hereditary link, but most are sporadic.</li>
          <li><strong>Environmental Triggers:</strong> Exposure to toxins, pesticides, or heavy metals may increase risk.</li>
          <li><strong>Age:</strong> Parkinson's Disease is more common in people over 60, though early-onset cases can occur.</li>
          <li><strong>Gender:</strong> Men are more likely to develop Parkinson’s than women.</li>
        </ul>

        <h2>Symptoms</h2>
        <ul>
          <li><strong>Tremors:</strong> Involuntary shaking, especially in the hands or fingers.</li>
          <li><strong>Bradykinesia:</strong> Slowness of movement that affects daily activities.</li>
          <li><strong>Rigidity:</strong> Muscle stiffness that makes movement painful.</li>
          <li><strong>Postural Instability:</strong> Difficulty maintaining balance, increasing the risk of falls.</li>
          <li><strong>Non-Motor Symptoms:</strong> Depression, sleep disturbances, cognitive impairment, and loss of smell.</li>
        </ul>

        <h2>Diagnosis</h2>
        <p>
          Parkinson's Disease is typically diagnosed based on symptoms and clinical examination. There are no specific tests, but brain imaging (MRI, PET scans) may help rule out other conditions.
        </p>
      </div>

      <div className="image-section-pd" data-aos="fade-left">
        <img src="./parkinson2.jpg" alt="Parkinson's Disease Symptoms" style={{  borderRadius: '15px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }} />
        <img src="./parkinson3.png" alt="Parkinson's Disease Symptoms" style={{  borderRadius: '15px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }} />

      </div>
    </div>
  );
}
