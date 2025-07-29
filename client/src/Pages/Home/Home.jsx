import React, { useState, useEffect } from 'react'
import Retrieve from '../../section/Retrieve/retrieve'
import Send from '../../section/Send/send'
import styles from './Styles/Home.module.scss'

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
            <div className={styles.loadingOverlay}>
                <div className={styles.spinner}></div>
            </div>
        )
    }

    return (
        <div className={styles.homeContainer}>
            {/* Header Section */}
            <header className={styles.homeHeader}>
                <h1>Welcome to Clipboard App</h1>
                <p className={styles.subtitle}>
                    Seamlessly share and retrieve clipboard data with secure, instant transfers
                </p>
            </header>
            
            {/* Main Content */}
            <main className={styles.homeContent}>
                <div className={styles.componentsContainer}>
                    {/* Send Component Wrapper - Left Side */}
                    <div className={`${styles.componentWrapper} ${styles.sendWrapper}`}>
                        <div className={styles.componentHeader}>
                            <span className={styles.componentIcon}>📤</span>
                            <h2>Send Data</h2>
                            <p>Share your clipboard content with others</p>
                        </div>
                        <Send />
                    </div>
                    
                    {/* Retrieve Component Wrapper - Right Side */}
                    <div className={`${styles.componentWrapper} ${styles.retrieveWrapper}`}>
                        <div className={styles.componentHeader}>
                            <span className={styles.componentIcon}>📥</span>
                            <h2>Retrieve Data</h2>
                            <p>Enter your code to retrieve shared content</p>
                        </div>
                        <Retrieve />
                    </div>
                </div>
                
                {/* Feature Cards Section */}
                <section className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <span className={styles.icon}>🔒</span>
                        <h3>Secure Transfer</h3>
                        <p>End-to-end encryption ensures your data stays private and secure</p>
                    </div>
                    <div className={styles.featureCard}>
                        <span className={styles.icon}>⚡</span>
                        <h3>Instant Sharing</h3>
                        <p>Share clipboard content instantly with generated unique codes</p>
                    </div>
                    <div className={styles.featureCard}>
                        <span className={styles.icon}>📱</span>
                        <h3>Cross Platform</h3>
                        <p>Works seamlessly across all devices and operating systems</p>
                    </div>
                </section>
                
                {/* Stats Section */}
                <section className={styles.statsSection}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>10K+</span>
                        <span className={styles.statLabel}>Transfers Made</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>99.9%</span>
                        <span className={styles.statLabel}>Uptime</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>1s</span>
                        <span className={styles.statLabel}>Average Speed</span>
                    </div>
                </section>
            </main>
            
            {/* System Status Indicator */}
            <div className={`${styles.statusIndicator} ${styles[systemStatus]}`}>
                {systemStatus === 'online' ? 'System Online' : 'System Offline'}
            </div>
            
            {/* Floating Action Button for Help */}
            <button 
                className={styles.fab} 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
                title="Back to top"
            >
                ↑
            </button>
            
            {/* Footer */}
            <footer className={styles.homeFooter}>
                <div className={styles.footerContent}>
                    <p>&copy; 2025 Clipboard App. All rights reserved.</p>
                    <div className={styles.footerLinks}>
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