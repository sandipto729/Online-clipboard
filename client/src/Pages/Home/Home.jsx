import React, { useState, useEffect } from 'react'
import Retrieve from '../../section/Retrieve/retrieve'
import Send from '../../section/Send/send'
import './Styles/Home.scss'

const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [systemStatus, setSystemStatus] = useState('online')

    // Simulate loading and system status check
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        // Simulate system status check
        const checkSystemStatus = () => {
            // You can replace this with actual API call to check system status
            setSystemStatus('online')
        }

        checkSystemStatus()
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="home-container">
            {/* Header Section */}
            <header className="home-header">
                <h1>Welcome to Clipboard App</h1>
                <p className="subtitle">
                    Seamlessly share and retrieve clipboard data with secure, instant transfers
                </p>
            </header>
            
            {/* Main Content */}
            <main className="home-content">
                <div className="components-container">
                    {/* Retrieve Component Wrapper */}
                    <div className="component-wrapper retrieve-wrapper">
                        <div className="component-header">
                            <span className="component-icon">📥</span>
                            <h2>Retrieve Data</h2>
                            <p>Enter your code to retrieve shared content</p>
                        </div>
                        <Retrieve />
                    </div>
                    
                    {/* Send Component Wrapper */}
                    <div className="component-wrapper send-wrapper">
                        <div className="component-header">
                            <span className="component-icon">📤</span>
                            <h2>Send Data</h2>
                            <p>Share your clipboard content with others</p>
                        </div>
                        <Send />
                    </div>
                </div>
                
                {/* Feature Cards Section */}
                <section className="feature-grid">
                    <div className="feature-card">
                        <span className="icon">🔒</span>
                        <h3>Secure Transfer</h3>
                        <p>End-to-end encryption ensures your data stays private and secure</p>
                    </div>
                    <div className="feature-card">
                        <span className="icon">⚡</span>
                        <h3>Instant Sharing</h3>
                        <p>Share clipboard content instantly with generated unique codes</p>
                    </div>
                    <div className="feature-card">
                        <span className="icon">📱</span>
                        <h3>Cross Platform</h3>
                        <p>Works seamlessly across all devices and operating systems</p>
                    </div>
                </section>
                
                {/* Stats Section */}
                <section className="stats-section">
                    <div className="stat-item">
                        <span className="stat-number">10K+</span>
                        <span className="stat-label">Transfers Made</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">99.9%</span>
                        <span className="stat-label">Uptime</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">1s</span>
                        <span className="stat-label">Average Speed</span>
                    </div>
                </section>
            </main>
            
            {/* System Status Indicator */}
            <div className={`status-indicator ${systemStatus}`}>
                {systemStatus === 'online' ? 'System Online' : 'System Offline'}
            </div>
            
            {/* Floating Action Button for Help */}
            <button 
                className="fab" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
                title="Back to top"
            >
                ↑
            </button>
            
            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-content">
                    <p>&copy; 2025 Clipboard App. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#support">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home