import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        countryCode: '+1',
        companyName: '',
        industry: '',
        goal: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setIsSuccess(false);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const generateTimeSlots = () => {
        return [
            "10:00",
            "11:00",
            "12:00",
            "13:00"
        ];
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        setSelectedTime(null); // Reset time when date changes
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            bookingDate: selectedDate ? selectedDate.toLocaleDateString() : '',
            bookingTime: selectedTime,
            timestamp: new Date().toISOString()
        };

        try {
            // REPLACE THIS URL WITH YOUR N8N WEBHOOK URL
            const webhookUrl = 'https://primary-production-4335.up.railway.app/webhook/book-consultation';

            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            setIsSuccess(true);
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                {isSuccess ? (
                    <div className="success-view">
                        <div className="success-icon">
                            <Check size={48} color="white" />
                        </div>
                        <h2>Booking Request Sent!</h2>
                        <p>We've received your request. Our team will confirm your appointment shortly via WhatsApp/Email.</p>
                        <button className="cta-button" onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <div className="booking-grid">
                        {/* Left Column: Form */}
                        <div className="form-column">
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                                Automaitee Digital - AI Automation
                            </h3>
                            <h2 className="animated-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                                Schedule a time to talk
                            </h2>
                            <form onSubmit={handleSubmit} id="bookingForm">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Your Mail ID" />
                                </div>
                                <div className="form-group">
                                    <label>WhatsApp</label>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '110px',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e5e5',
                                                backgroundColor: '#f5f5f7',
                                                fontSize: '0.95rem'
                                            }}
                                        >
                                            <option value="+1">+1 (US)</option>
                                            <option value="+44">+44 (UK)</option>
                                            <option value="+91">+91 (IN)</option>
                                            <option value="+61">+61 (AU)</option>
                                            <option value="+971">+971 (AE)</option>
                                            <option value="+65">+65 (SG)</option>
                                            <option value="+33">+33 (FR)</option>
                                            <option value="+49">+49 (DE)</option>
                                        </select>
                                        <input
                                            type="tel"
                                            name="whatsapp"
                                            required
                                            value={formData.whatsapp}
                                            onChange={handleInputChange}
                                            placeholder="Phone Number"
                                            style={{ flex: 1 }}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Industry</label>
                                        <select name="industry" value={formData.industry} onChange={handleInputChange}>
                                            <option value="">Select...</option>
                                            <option value="Education">Education</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Real Estate">Real Estate</option>
                                            <option value="Hospitality">Hospitality</option>
                                            <option value="Marketing / Advertising">Marketing / Advertising</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="Manufacturing / Industrial">Manufacturing / Industrial</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Goal</label>
                                    <textarea name="goal" rows="2" value={formData.goal} onChange={handleInputChange} placeholder="What do you want to automate?"></textarea>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Calendar */}
                        <div className="calendar-column">
                            <div className="calendar-header">
                                <button onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
                                <h3>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                                <button onClick={handleNextMonth}><ChevronRight size={20} /></button>
                            </div>

                            <div className="calendar-grid">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                    <div key={d} className="calendar-day-header">{d}</div>
                                ))}
                                {Array(firstDayOfMonth(currentMonth)).fill(null).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {Array(daysInMonth(currentMonth)).fill(null).map((_, i) => {
                                    const day = i + 1;
                                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                                    const isToday = date.toDateString() === new Date().toDateString();

                                    // Disable past dates and today
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const isDisabled = date <= today;

                                    return (
                                        <button
                                            key={day}
                                            className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                                            onClick={() => handleDateClick(day)}
                                            type="button"
                                            disabled={isDisabled}
                                            style={isDisabled ? { opacity: 0.3, cursor: 'not-allowed' } : {}}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>

                            {selectedDate && (
                                <div className="time-slots">
                                    <h4>Available Times for {selectedDate.toLocaleDateString()} (GMT)</h4>
                                    <div className="slots-grid">
                                        {generateTimeSlots().map(time => (
                                            <button
                                                key={time}
                                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                                onClick={() => setSelectedTime(time)}
                                                type="button"
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    form="bookingForm"
                                    className="submit-btn"
                                    disabled={!selectedDate || !selectedTime || isSubmitting}
                                >
                                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
