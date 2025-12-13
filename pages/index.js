import { useState } from 'react'

export default function Home() {
    const [step, setStep] = useState(1)

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    return (
        <section className="view active">
            <header className="hero">
                <h1>Business Automation - Personalized</h1>
                <p className="subtitle">Affordable Automation Partner</p>
                <p className="hero-tagline">Reduce Team Cost with AI Workforce</p>
            </header>

            <section className="inquiry-section">
                <div className="card">
                    <h2>Get Started</h2>
                    <div className="quiz-container">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(step / 6) * 100}%` }}></div>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            {step === 1 && (
                                <div className="quiz-step active">
                                    <h3>1. Business Basics</h3>
                                    <div className="form-group">
                                        <label>Business Name *</label>
                                        <input type="text" name="businessName" placeholder="Business Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="size" placeholder="Size (Employees, Branches)" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="location" placeholder="Location(s)" />
                                    </div>
                                    <div className="form-group">
                                        <label>Industry / Nature of Business *</label>
                                        <input type="text" name="industry" placeholder="Industry / Nature of Business" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="website" placeholder="Website / Social Links" />
                                    </div>
                                    <div className="step-buttons">
                                        <button type="button" className="btn-primary btn-next" onClick={nextStep}>Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="quiz-step active">
                                    <h3>2. Current Process Overview</h3>
                                    <div className="form-group">
                                        <textarea name="manualTasks" placeholder="What do you need to automate?" rows="3"></textarea>
                                    </div>
                                    <div className="step-buttons">
                                        <button type="button" className="btn-secondary btn-prev" onClick={prevStep}>Back</button>
                                        <button type="button" className="btn-primary btn-next" onClick={nextStep}>Next</button>
                                    </div>
                                </div>
                            )}

                            {/* Simplified for brevity - add other steps as needed */}
                            {step > 2 && (
                                <div className="quiz-step active">
                                    <h3>Step {step} (Placeholder)</h3>
                                    <p>More steps would go here...</p>
                                    <div className="step-buttons">
                                        <button type="button" className="btn-secondary btn-prev" onClick={prevStep}>Back</button>
                                        {step < 6 ? (
                                            <button type="button" className="btn-primary btn-next" onClick={nextStep}>Next</button>
                                        ) : (
                                            <button type="submit" className="btn-primary">Submit Inquiry</button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </section>
    )
}
