import React, { useState, useEffect } from 'react';
import './checkup.css';

const Checkup = () => {
  const [formData, setFormData] = useState({
    age: '',
    no_employees_mid: '',
    leave: '',
    work_interfere: '',
    self_employed: '',
    family_history: '',
    remote_work: '',
    tech_company: '',
    benefits: '',
    care_options: '',
    wellness_program: '',
    seek_help: '',
    anonymity: '',
    mental_health_interview: '',
    phys_health_interview: '',
    mental_vs_physical: '',
    mental_health_consequence: '',
    phys_health_consequence: '',
    obs_consequence: '',
    coworkers: '',
    supervisor: '',
    gender: 'male',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // No body background styling here
    return () => {
      // No body background styling cleanup here
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'radio' ? (value === '1' ? 1 : 0) : value,
    }));
  };

  const handleGenderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    const dataToSend = { ...formData };
    for (const key in dataToSend) {
      if (typeof dataToSend[key] === 'string' && key !== 'gender') {
        dataToSend[key] = parseInt(dataToSend[key], 10);
      }
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Something went wrong with the prediction.');
      }

      const result = await response.json();
      setPrediction(result.prediction);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderBinaryQuestion = (name, label) => (
    <div className="form-group" key={name}>
      <label>{label}:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name={name}
            value="1"
            checked={formData[name] === 1}
            onChange={handleChange}
            required
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name={name}
            value="0"
            checked={formData[name] === 0}
            onChange={handleChange}
            required
          />
          No
        </label>
      </div>
    </div>
  );

  return (
    <section className="checkup-section">
      <div className="container">
        <h1>Mental Health Checkup Survey</h1>
        <p>Please answer the following questions to get your mental health risk prediction.</p>

        <form onSubmit={handleSubmit} className="checkup-form">
          <div className="form-group">
            <label htmlFor="age">Age: <span>{formData.age}</span></label>
            <input
              type="range"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="120"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="no_employees_mid">Number of Employees (Mid-range):</label>
            <input
              type="number"
              id="no_employees_mid"
              name="no_employees_mid"
              value={formData.no_employees_mid}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="leave">How easy is it to take medical leave for a mental health condition?</label>
            <select
              id="leave"
              name="leave"
              value={formData.leave}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="0">Very easy</option>
              <option value="1">Somewhat easy</option>
              <option value="2">Neutral</option>
              <option value="3">Somewhat difficult</option>
              <option value="4">Very difficult</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="work_interfere">Does your work interfere with your treatment?</label>
            <select
              id="work_interfere"
              name="work_interfere"
              value={formData.work_interfere}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="0">Often</option>
              <option value="1">Sometimes</option>
              <option value="2">Never</option>
              <option value="3">Not applicable</option>
            </select>
          </div>

          {renderBinaryQuestion('self_employed', 'Are you self-employed?')}
          {renderBinaryQuestion('family_history', 'Do you have a family history of mental illness?')}
          {renderBinaryQuestion('remote_work', 'Do you work remotely?')}
          {renderBinaryQuestion('tech_company', 'Do you work for a tech company?')}
          {renderBinaryQuestion('benefits', 'Does your employer provide mental health benefits?')}
          {renderBinaryQuestion('care_options', 'Does your employer provide mental health care options?')}
          {renderBinaryQuestion('wellness_program', 'Does your employer provide a wellness program?')}
          {renderBinaryQuestion('seek_help', 'Does your employer provide resources to seek help for mental health?')}
          {renderBinaryQuestion('anonymity', 'Is your anonymity protected if you seek mental health treatment?')}
          {renderBinaryQuestion('mental_health_interview', 'Have you discussed your mental health with your employer?')}
          {renderBinaryQuestion('phys_health_interview', 'Have you discussed your physical health with your employer?')}
          {renderBinaryQuestion('mental_vs_physical', 'Does your employer discuss mental health as openly as physical health?')}
          {renderBinaryQuestion('mental_health_consequence', 'Do you fear negative consequences for discussing your mental health with your employer?')}
          {renderBinaryQuestion('phys_health_consequence', 'Do you fear negative consequences for discussing your physical health with your employer?')}
          {renderBinaryQuestion('obs_consequence', 'Have you observed negative consequences for coworkers who discussed mental health?')}
          {renderBinaryQuestion('coworkers', 'Would you be comfortable discussing a mental health issue with your coworkers?')}
          {renderBinaryQuestion('supervisor', 'Would you be comfortable discussing a mental health issue with your direct supervisor?')}

          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleGenderChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleGenderChange}
                  required
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleGenderChange}
                  required
                />
                Other
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">Get Prediction</button>
        </form>

        {prediction && (
          <div className="prediction-result">
            <h2>Prediction: {prediction}</h2>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkup;